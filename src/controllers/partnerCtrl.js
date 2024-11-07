const {mapAppIds, getUrlByAppId} = require("../utils");
const {appIds} = require("../common");


const getPartners = async (db) => {
    const query = {
        app_id: { $in: appIds }
    }
    return await db.collection("partner").find(query).toArray()
}

const projectPartnerData = (partners) => {
    return partners.map((partner) =>
        ({partnerAppId: partner.app_id, partnerName: partner.name, partnerUrl: partner.url})
    );
}


const queryBuilderForPartnersUpdate = (partners) => {
    const query = []
    partners.forEach(partner => {
        let updateBlock = {
            updateMany: {
                filter: { name: partner.partnerName },
                update: { $set: {
                    app_id: mapAppIds(partner.partnerAppId),
                    name: partner.partnerName.toString().replace(/\b(?:UAT|QA)\b/, 'E2E'),
                    url: getUrlByAppId(partner.partnerAppId)
                    }
                }
            }
        }
        query.push(updateBlock)
    })
    return query
}


const updatePartnersInDB = async (db, partners) => {
    const query = queryBuilderForPartnersUpdate(partners)
    await db.collection("partner").bulkWrite(query)
}

exports.updatePartners = async (db, dbName) => {
    try {
        const partners = await getPartners(db)
        const partnersMap = projectPartnerData(partners)
        await updatePartnersInDB(db, partnersMap)
        console.log("Updated partners successfully.")
    } catch (err) {
        console.error(`failed to update the partner ${dbName}, error: ${err}`);
    }
}