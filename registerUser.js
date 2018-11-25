var hfc = require('fabric-client');
var fca = require('fabric-ca-client')
var path = require('path')


async function getFabricClient() {

    // Load the network configuration file
    let client = hfc.loadFromConfig('./org3-config.json');
    //Init credential store, make sure that credential store path is defined in the network config file
    await client.initCredentialStores();

    // Get admin user context, this would act as a registrar while enrolling other users.
    await client.setUserContext({
        username: "admin",
        password: "???"
    });

    return client;
}

async function getdiscovery() {
    var client = new hfc();   

    var store_path = path.join(__dirname, 'hfc-key-store');
    let ss = await hfc.newDefaultKeyValueStore({
        path: store_path
    });
    await client.setStateStore(ss);
    var crypto_suite = hfc.newCryptoSuite();
    var crypto_store = hfc.newCryptoKeyStore({
        path: store_path
    });
    crypto_suite.setCryptoKeyStore(crypto_store);
    client.setCryptoSuite(crypto_suite);
    var fabric_ca_client = new fca('https://n420f36c713054284ae6f80951f01422e-org1-ca.uk04.blockchain.ibm.com:31011', null, '', crypto_suite);

    var enrollment = await fabric_ca_client.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: "cf7ab56233"
    })
    var user =await  client.createUser({
        username: 'admin',
        mspid: 'org1',
        cryptoContent: {
            privateKeyPEM: enrollment.key.toBytes(),
            signedCertPEM: enrollment.certificate
        }
    });
    await client.setUserContext(user);
    //client.setConfigSetting('initialize-with-discovery', true);
    
    var opts = {pem:"-----BEGIN CERTIFICATE-----\nMIIEkjCCA3qgAwIBAgIQCgFBQgAAAVOFc2oLheynCDANBgkqhkiG9w0BAQsFADA/\nMSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\nDkRTVCBSb290IENBIFgzMB4XDTE2MDMxNzE2NDA0NloXDTIxMDMxNzE2NDA0Nlow\nSjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUxldCdzIEVuY3J5cHQxIzAhBgNVBAMT\nGkxldCdzIEVuY3J5cHQgQXV0aG9yaXR5IFgzMIIBIjANBgkqhkiG9w0BAQEFAAOC\nAQ8AMIIBCgKCAQEAnNMM8FrlLke3cl03g7NoYzDq1zUmGSXhvb418XCSL7e4S0EF\nq6meNQhY7LEqxGiHC6PjdeTm86dicbp5gWAf15Gan/PQeGdxyGkOlZHP/uaZ6WA8\nSMx+yk13EiSdRxta67nsHjcAHJyse6cF6s5K671B5TaYucv9bTyWaN8jKkKQDIZ0\nZ8h/pZq4UmEUEz9l6YKHy9v6Dlb2honzhT+Xhq+w3Brvaw2VFn3EK6BlspkENnWA\na6xK8xuQSXgvopZPKiAlKQTGdMDQMc2PMTiVFrqoM7hD8bEfwzB/onkxEz0tNvjj\n/PIzark5McWvxI0NHWQWM6r6hCm21AvA2H3DkwIDAQABo4IBfTCCAXkwEgYDVR0T\nAQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAYYwfwYIKwYBBQUHAQEEczBxMDIG\nCCsGAQUFBzABhiZodHRwOi8vaXNyZy50cnVzdGlkLm9jc3AuaWRlbnRydXN0LmNv\nbTA7BggrBgEFBQcwAoYvaHR0cDovL2FwcHMuaWRlbnRydXN0LmNvbS9yb290cy9k\nc3Ryb290Y2F4My5wN2MwHwYDVR0jBBgwFoAUxKexpHsscfrb4UuQdf/EFWCFiRAw\nVAYDVR0gBE0wSzAIBgZngQwBAgEwPwYLKwYBBAGC3xMBAQEwMDAuBggrBgEFBQcC\nARYiaHR0cDovL2Nwcy5yb290LXgxLmxldHNlbmNyeXB0Lm9yZzA8BgNVHR8ENTAz\nMDGgL6AthitodHRwOi8vY3JsLmlkZW50cnVzdC5jb20vRFNUUk9PVENBWDNDUkwu\nY3JsMB0GA1UdDgQWBBSoSmpjBH3duubRObemRWXv86jsoTANBgkqhkiG9w0BAQsF\nAAOCAQEA3TPXEfNjWDjdGBX7CVW+dla5cEilaUcne8IkCJLxWh9KEik3JHRRHGJo\nuM2VcGfl96S8TihRzZvoroed6ti6WqEBmtzw3Wodatg+VyOeph4EYpr/1wXKtx8/\nwApIvJSwtmVi4MFU5aMqrSDE6ea73Mj2tcMyo5jMd6jmeWUHK8so/joWUoHOUgwu\nX4Po1QYz+3dszkDqMp4fklxBwXRsW10KXzPMTZ+sOPAveyxindmjkW8lGy+QsRlG\nPfZ+G6Z6h7mjem0Y+iWlkYcV4PIWL1iwBi8saCbGS5jN2p8M+X+Q7UNKEkROb3N6\nKOqkqm57TH2H3eDJAkSnh6/DNFu0Qg==\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/\nMSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\nDkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow\nPzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD\nEw5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\nAN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O\nrz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq\nOLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b\nxiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw\n7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAjqr2m7xPi71XAicPNaD\naeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV\nHQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG\nSIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69\nikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr\nAvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz\nR8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5\nJDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo\nOb8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ\n-----END CERTIFICATE-----" }
    //console.log(client.queryPeers("grpcs://n420f36c713054284ae6f80951f01422e-org3-peer3bfd.uk04.blockchain.ibm.com:31002",opts));
    const peer = client.newPeer("grpcs://n420f36c713054284ae6f80951f01422e-org1-peer1.uk04.blockchain.ibm.com:31002", opts);
    //var chnls=await client.queryChannels(peer);
    //console.log(chnls);
    
    const channel = client.newChannel('arabae-arabjo');
    await channel.addPeer(peer);
    await channel.initialize({
        discover: true  });
    await channel.refresh();
    var res=await channel.getDiscoveryResults();
  
   // console.log(res);

    const tx_id = client.newTransactionID();
const request = {
    chaincodeId : "Phantom",
    fcn: "Init",
    args: [],
    txId: tx_id
};
//preferred: ['org1-peer1', 'grpcs://n420f36c713054284ae6f80951f01422e-org1-peer1.uk04.blockchain.ibm.com:31002'],

var endPro=await channel.sendTransactionProposal(request);
console.log(endPro[2]);

   //var rest=await client.queryPeers("grpcs://n420f36c713054284ae6f80951f01422e-org3-peer3bfd.uk04.blockchain.ibm.com:31002", opts);
//console.log(rest)
}

var registerUser = async function () {
    const client = await getFabricClient();

    var fabric_ca_client = client.getCertificateAuthority();

    // describe identity, with attributes if you wish to implement attribute based access control in your chaincode
    var registerReq = {
        enrollmentID: "test_user",
        role: "user",
        maxEnrollments: 12,
        affiliation: "org3",
        attrs: [{
                name: 'attr1',
                value: 'test',
                ecert: true
            },
            {
                name: 'attr2',
                value: 'test2',
                ecert: true
            }
        ]
    }
    //get registrar
    var registrar = await client.getUserContext();
    //Regsiter User
    var enrolSecret = await fabric_ca_client.register(registerReq, registrar)
    // print enroll secret
    console.log(enrolSecret);
}


getdiscovery().then(() => {});
//revokeUser().then(() => {});