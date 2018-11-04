var hfc = require('fabric-client');

async function getFabricClient() {

    let client = hfc.loadFromConfig('./org1-config.json');

    await client.initCredentialStores();
    var ca = client.getCertificateAuthority();
    //await client.setUserContext(ca.getRegistrar())


    await client.setUserContext({
        username: "admin",
        password: "c2556b51fc"
    });

    return client;
}



var registerUser = async function () {
    const client = await getFabricClient();

    var fabric_ca_client = client.getCertificateAuthority();

    var registerReq = {
        enrollmentID: "test",
        role: "user",
        maxEnrollments : 12,
        affiliation : "org1",
        attrs: [{
            name: 'bic',
            value: 'ARABJO',
            ecert: true
        }]
    }
var registrar=await client.getUserContext();
var enrolSecret=await fabric_ca_client.register(registerReq,registrar)
    console.log(enrolSecret);
}


var revokeUser = async function () {
    const client = await getFabricClient();

    var fabric_ca_client = client.getCertificateAuthority();

    var revokeRequest = {
        enrollmentID: "arabjouser",
        aki:"*"
    }
var registrar=await client.getUserContext();
var resp=await fabric_ca_client.revoke(revokeRequest,registrar)
    console.log(resp);
}

registerUser().then(() => {});
//revokeUser().then(() => {});