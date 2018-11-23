var hfc = require('fabric-client');

async function getFabricClient() {

    // Load the network configuration file
    let client = hfc.loadFromConfig('./org3-config.json');
    //Init credential store, make sure that credential store path is defined in the network config file
    await client.initCredentialStores();

    // Get admin user context, this would act as a registrar while enrolling other users.
    await client.setUserContext({
        username: "admin",
        password: "??????"
    });

    return client;
}

var registerUser = async function () {
    const client = await getFabricClient();

    var fabric_ca_client = client.getCertificateAuthority();

    // describe identity, with attributes if you wish to implement attribute based access control in your chaincode
    var registerReq = {
        enrollmentID: "test_user",
        role: "user",
        maxEnrollments : 12,
        affiliation : "org3",
        attrs: [{
            name: 'attr1',
            value: 'test',
            ecert: true
        },
        {
            name: 'attr2',
            value: 'test2',
            ecert: true
        }]
    }
    //get registrar
var registrar=await client.getUserContext();
//Regsiter User
var enrolSecret=await fabric_ca_client.register(registerReq,registrar)
// print enroll secret
console.log(enrolSecret);
}

/*
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
}*/

registerUser().then(() => {});
//revokeUser().then(() => {});