const banks = [
  { id: "ZENITH-001", name: "Zenith Bank" },
];

const neighborhoods = [
  { branch: "Victoria Island", lat: 6.428, lng: 3.4219 },
  { branch: "Lekki Phase 1", lat: 6.4474, lng: 3.4705 },
  { branch: "Ikeja", lat: 6.6018, lng: 3.3515 },
  { branch: "Surulere", lat: 6.4969, lng: 3.3612 },
  { branch: "Yaba", lat: 6.5074, lng: 3.3801 },
  { branch: "Ikoyi", lat: 6.4356, lng: 3.4215 },
  { branch: "Apapa", lat: 6.4482, lng: 3.3611 },
  { branch: "Ajah", lat: 6.488, lng: 3.562 },
];

const statuses: ATM["status"][] = ["ONLINE", "OFFLINE", "MAINTENANCE"];

export const mockAtms: ATM[] =
 [
  {
    "id": "ATM-LAG-0001",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Victoria Island",
      "address": "153 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.432098,
        "lng": 3.426749
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 16999496,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.046924,
      "cashOutRisk": 0.354145,
      "networkFailureRisk": 0.053181
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0002",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Lekki Phase 1",
      "address": "129 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451996,
        "lng": 3.472719
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 17351659,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.819385,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0003",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Ikeja",
      "address": "153 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.606275,
        "lng": 3.354143
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 17565972,
      "currentAmount": 3866089,
      "lowThreshold": 4391493,
      "emptyThreshold": 878298
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.404597,
      "cashOutRisk": 0.170566,
      "networkFailureRisk": 0.199341
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0004",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Surulere",
      "address": "146 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.500989,
        "lng": 3.361955
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19688755,
      "currentAmount": 3392490,
      "lowThreshold": 4922188,
      "emptyThreshold": 984437
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 3
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.052843,
      "cashOutRisk": 0.35338,
      "networkFailureRisk": 0.071855
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0005",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Yaba",
      "address": "15 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.508535,
        "lng": 3.383186
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18239089,
      "currentAmount": 3020967,
      "lowThreshold": 4559772,
      "emptyThreshold": 911954
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 38
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.054593,
      "cashOutRisk": 0.046313,
      "networkFailureRisk": 0.127889
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0006",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Ikoyi",
      "address": "194 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.436322,
        "lng": 3.424911
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18835849,
      "currentAmount": 15843467,
      "lowThreshold": 4708962,
      "emptyThreshold": 941792
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 20
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.038481,
      "cashOutRisk": 0.446824,
      "networkFailureRisk": 0.160032
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0007",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Apapa",
      "address": "177 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.362095
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 15632497,
      "currentAmount": 7183307,
      "lowThreshold": 3908124,
      "emptyThreshold": 781624
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 88
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.654877,
      "cashOutRisk": 0.354145,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0008",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Ajah",
      "address": "58 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.489114,
        "lng": 3.565158
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 16091216,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 20
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.165997,
      "cashOutRisk": 0.58988,
      "networkFailureRisk": 0.165463
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0009",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Victoria Island",
      "address": "153 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.430035,
        "lng": 3.424161
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 7183307,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.354145,
      "cashOutRisk": 0.446824,
      "networkFailureRisk": 0.088194
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0010",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Lekki Phase 1",
      "address": "146 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451676,
        "lng": 3.473551
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 13346917,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 88
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.187841,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0011",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Ikeja",
      "address": "15 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.606275,
        "lng": 3.354005
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 10582531,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.659614,
      "cashOutRisk": 0.820684,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0012",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Surulere",
      "address": "194 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.501509,
        "lng": 3.365319
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 19163013,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 3
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.540842,
      "cashOutRisk": 0.551717,
      "networkFailureRisk": 0.165997
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0013",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Yaba",
      "address": "177 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.508269,
        "lng": 3.380482
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 17351659,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.052843,
      "cashOutRisk": 0.444747,
      "networkFailureRisk": 0.187841
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0014",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Ikoyi",
      "address": "58 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.435728,
        "lng": 3.424367
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 19163013,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": false,
      "generator": false,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.404597,
      "cashOutRisk": 0.850424,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0015",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Apapa",
      "address": "153 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.361596
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 8516091,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.659614,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.05739
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0016",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Ajah",
      "address": "146 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.491959,
        "lng": 3.565809
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 14931327,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.038481,
      "cashOutRisk": 0.551717,
      "networkFailureRisk": 0.168541
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0017",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Victoria Island",
      "address": "15 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.432098,
        "lng": 3.424683
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 13346917,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.654877,
      "cashOutRisk": 0.850424,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0018",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Lekki Phase 1",
      "address": "194 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.449764,
        "lng": 3.475474
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 14931327,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.354145,
      "cashOutRisk": 0.35338,
      "networkFailureRisk": 0.165463
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0019",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Ikeja",
      "address": "177 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.60309,
        "lng": 3.352467
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 10582531,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.187841,
      "cashOutRisk": 0.58988,
      "networkFailureRisk": 0.168541
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0020",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Surulere",
      "address": "58 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.500989,
        "lng": 3.36154
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 3866089,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.444747,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0021",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Yaba",
      "address": "153 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.508535,
        "lng": 3.383177
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 16999496,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.540842,
      "cashOutRisk": 0.819385,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0022",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Ikoyi",
      "address": "146 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.438458,
        "lng": 3.424367
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 8516091,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.054593,
      "cashOutRisk": 0.170566,
      "networkFailureRisk": 0.088194
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0023",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Apapa",
      "address": "15 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.365319
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 14931327,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": false,
      "generator": false,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.601556,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0024",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Ajah",
      "address": "194 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.491959,
        "lng": 3.565158
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 10582531,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.654877,
      "cashOutRisk": 0.551717,
      "networkFailureRisk": 0.05739
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0025",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Victoria Island",
      "address": "177 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.432098,
        "lng": 3.423984
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 3866089,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.054593,
      "cashOutRisk": 0.820684,
      "networkFailureRisk": 0.165997
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0026",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Lekki Phase 1",
      "address": "58 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451676,
        "lng": 3.473551
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 16999496,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.446824,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0027",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Ikeja",
      "address": "153 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.60309,
        "lng": 3.354143
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 17351659,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.659614,
      "cashOutRisk": 0.35338,
      "networkFailureRisk": 0.168541
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0028",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Surulere",
      "address": "146 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.500989,
        "lng": 3.365319
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 19163013,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.165997,
      "cashOutRisk": 0.820684,
      "networkFailureRisk": 0.053181
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0029",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Yaba",
      "address": "15 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.511794,
        "lng": 3.383186
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 8516091,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.58988,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0030",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Ikoyi",
      "address": "194 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.438458,
        "lng": 3.425983
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 17351659,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": false,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.654877,
      "cashOutRisk": 0.170566,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0031",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Apapa",
      "address": "177 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.364998
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 14931327,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.054593,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.088194
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0032",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Ajah",
      "address": "58 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.491959,
        "lng": 3.565809
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 16091216,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.444747,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0033",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Victoria Island",
      "address": "153 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.432098,
        "lng": 3.426749
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 3392490,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.404597,
      "cashOutRisk": 0.819385,
      "networkFailureRisk": 0.053181
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0034",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Lekki Phase 1",
      "address": "146 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451996,
        "lng": 3.475474
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 16999496,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": false,
      "generator": false,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.165997,
      "cashOutRisk": 0.58988,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0035",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Ikeja",
      "address": "15 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.60309,
        "lng": 3.354143
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 17351659,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.601556,
      "cashOutRisk": 0.850424,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0036",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Surulere",
      "address": "194 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.500989,
        "lng": 3.361955
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 10582531,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.404597,
      "cashOutRisk": 0.444747,
      "networkFailureRisk": 0.168541
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0037",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Yaba",
      "address": "177 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.511794,
        "lng": 3.383177
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 19163013,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.046924,
      "cashOutRisk": 0.170566,
      "networkFailureRisk": 0.05739
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0038",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Ikoyi",
      "address": "58 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.436322,
        "lng": 3.424911
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 3392490,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0039",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Apapa",
      "address": "153 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.364998
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 16091216,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.659614,
      "cashOutRisk": 0.820684,
      "networkFailureRisk": 0.053181
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0040",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Ajah",
      "address": "146 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.489114,
        "lng": 3.565809
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 7183307,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.052843,
      "cashOutRisk": 0.551717,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0041",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Victoria Island",
      "address": "15 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.430035,
        "lng": 3.424161
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 16999496,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": false,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.446824,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0042",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Lekki Phase 1",
      "address": "194 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451996,
        "lng": 3.475474
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 17351659,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.601556,
      "cashOutRisk": 0.35338,
      "networkFailureRisk": 0.088194
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0043",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Ikeja",
      "address": "177 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.60309,
        "lng": 3.352467
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 19163013,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.054593,
      "cashOutRisk": 0.819385,
      "networkFailureRisk": 0.165463
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0044",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Surulere",
      "address": "58 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.500989,
        "lng": 3.36154
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 3866089,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.58988,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0045",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Yaba",
      "address": "153 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.508269,
        "lng": 3.383177
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 16999496,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.354145,
      "cashOutRisk": 0.850424,
      "networkFailureRisk": 0.168541
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0046",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Ikoyi",
      "address": "146 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.438458,
        "lng": 3.424911
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 17351659,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.046924,
      "cashOutRisk": 0.444747,
      "networkFailureRisk": 0.053181
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0047",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Apapa",
      "address": "15 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.361596
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 19163013,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.170566,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0048",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Ajah",
      "address": "194 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.491959,
        "lng": 3.565158
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 3392490,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.659614,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0049",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Victoria Island",
      "address": "177 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.432098,
        "lng": 3.424683
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 16091216,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.165997,
      "cashOutRisk": 0.551717,
      "networkFailureRisk": 0.088194
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0050",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Lekki Phase 1",
      "address": "58 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451676,
        "lng": 3.473551
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 7183307,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": false,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.601556,
      "cashOutRisk": 0.819385,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0051",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Ikeja",
      "address": "153 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.60309,
        "lng": 3.354143
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 17351659,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.654877,
      "cashOutRisk": 0.446824,
      "networkFailureRisk": 0.05739
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0052",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Surulere",
      "address": "146 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.501509,
        "lng": 3.361955
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 3392490,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.046924,
      "cashOutRisk": 0.35338,
      "networkFailureRisk": 0.165997
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0053",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Yaba",
      "address": "15 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.511794,
        "lng": 3.383177
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 16091216,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.601556,
      "cashOutRisk": 0.58988,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0054",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Ikoyi",
      "address": "194 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.436322,
        "lng": 3.424367
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 7183307,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.404597,
      "cashOutRisk": 0.820684,
      "networkFailureRisk": 0.168541
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0055",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Apapa",
      "address": "177 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.362095
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 3392490,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.187841,
      "cashOutRisk": 0.444747,
      "networkFailureRisk": 0.053181
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0056",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Ajah",
      "address": "58 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.489114,
        "lng": 3.565158
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 14931327,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.170566,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0057",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Victoria Island",
      "address": "153 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.432098,
        "lng": 3.424161
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 16999496,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.404597,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0058",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Lekki Phase 1",
      "address": "146 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451996,
        "lng": 3.475474
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 10582531,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": false,
      "generator": false,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.052843,
      "cashOutRisk": 0.819385,
      "networkFailureRisk": 0.088194
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0059",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Ikeja",
      "address": "15 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.60309,
        "lng": 3.352467
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 17351659,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.444747,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0060",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Surulere",
      "address": "194 Surulere Street, Lagos",
      "lga": "Surulere",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.501509,
        "lng": 3.36154
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 19163013,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.404597,
      "cashOutRisk": 0.58988,
      "networkFailureRisk": 0.053181
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0061",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Yaba",
      "address": "177 Yaba Street, Lagos",
      "lga": "Yaba",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.511794,
        "lng": 3.383186
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 8516091,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.187841,
      "cashOutRisk": 8.50424e-1,
      "networkFailureRisk": 0.165463
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0062",
    "bankId": "GTB-002",
    "location": {
      "branchName": "GTBank - Ikoyi",
      "address": "58 Ikoyi Street, Lagos",
      "lga": "Ikoyi",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.438458,
        "lng": 3.424911
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17894569,
      "currentAmount": 16999496,
      "lowThreshold": 4473642,
      "emptyThreshold": 894728
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.654877,
      "cashOutRisk": 0.446824,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0063",
    "bankId": "ACCESS-003",
    "location": {
      "branchName": "Access Bank - Apapa",
      "address": "153 Apapa Street, Lagos",
      "lga": "Apapa",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.452601,
        "lng": 3.364998
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18512399,
      "currentAmount": 17351659,
      "lowThreshold": 4628099,
      "emptyThreshold": 925619
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 78
    },
    "telemetry": {
      "temperatureC": 28,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.654877,
      "cashOutRisk": 0.35338,
      "networkFailureRisk": 0.168541
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0064",
    "bankId": "UBA-004",
    "location": {
      "branchName": "UBA - Ajah",
      "address": "146 Ajah Street, Lagos",
      "lga": "Ajah",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.491959,
        "lng": 3.565809
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 16962534,
      "currentAmount": 19163013,
      "lowThreshold": 4240633,
      "emptyThreshold": 848126
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 74
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.187841,
      "cashOutRisk": 0.222728,
      "networkFailureRisk": 0.05739
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0065",
    "bankId": "FIRST-005",
    "location": {
      "branchName": "First Bank - Victoria Island",
      "address": "15 Victoria Island Street, Lagos",
      "lga": "Victoria Island",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.432098,
        "lng": 3.426749
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "OFFLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "DISCONNECTED",
    "cashLevel": {
      "totalCapacity": 17855799,
      "currentAmount": 3392490,
      "lowThreshold": 4463949,
      "emptyThreshold": 892789
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 9
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": [
        "E404"
      ]
    },
    "predictiveScore": {
      "failureRisk": 0.772551,
      "cashOutRisk": 0.820684,
      "networkFailureRisk": 0.8
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0066",
    "bankId": "FID-006",
    "location": {
      "branchName": "Fidelity Bank - Lekki Phase 1",
      "address": "194 Lekki Phase 1 Street, Lagos",
      "lga": "Lekki Phase 1",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.451996,
        "lng": 3.472719
      }
    },
    "model": "Diebold Opteva 520",
    "type": "FULL_FUNCTION",
    "status": "MAINTENANCE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 19999066,
      "currentAmount": 16091216,
      "lowThreshold": 4999766,
      "emptyThreshold": 999953
    },
    "powerStatus": {
      "mains": true,
      "generator": false,
      "inverter": true,
      "fuelLevel": 56
    },
    "telemetry": {
      "temperatureC": 26,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.540842,
      "cashOutRisk": 0.551717,
      "networkFailureRisk": 0.165463
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  },
  {
    "id": "ATM-LAG-0067",
    "bankId": "ZENITH-001",
    "location": {
      "branchName": "Zenith Bank - Ikeja",
      "address": "177 Ikeja Street, Lagos",
      "lga": "Ikeja",
      "state": "Lagos",
      "coordinates": {
        "lat": 6.60309,
        "lng": 3.354005
      }
    },
    "model": "NCR SelfServ 80",
    "type": "FULL_FUNCTION",
    "status": "ONLINE",
    "lastUpdated": "2025-11-14T12:37:26.541Z",
    "networkStatus": "CONNECTED",
    "cashLevel": {
      "totalCapacity": 18274041,
      "currentAmount": 7183307,
      "lowThreshold": 4568510,
      "emptyThreshold": 913702
    },
    "powerStatus": {
      "mains": true,
      "generator": true,
      "inverter": true,
      "fuelLevel": 17
    },
    "telemetry": {
      "temperatureC": 27,
      "errorCodes": []
    },
    "predictiveScore": {
      "failureRisk": 0.052843,
      "cashOutRisk": 0.354145,
      "networkFailureRisk": 0.170566
    },
    "createdAt": "2025-11-14T12:37:26.541Z",
    "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0068",
  //   "bankId": "GTB-002",
  //   "location": {
  //     "branchName": "GTBank - Surulere",
  //     "address": "58 Surulere Street, Lagos",
  //     "lga": "Surulere",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.501509,
  //       "lng": 3.36154
  //     }
  //   },
  //   "model": "Diebold Opteva 520",
  //   "type": "FULL_FUNCTION",
  //   "status": "OFFLINE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "DISCONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 17894569,
  //     "currentAmount": 16999496,
  //     "lowThreshold": 4473642,
  //     "emptyThreshold": 894728
  //   },
  //   "powerStatus": {
  //     "mains": true,
  //     "generator": true,
  //     "inverter": true,
  //     "fuelLevel": 78
  //   },
  //   "telemetry": {
  //     "temperatureC": 27,
  //     "errorCodes": [
  //       "E404"
  //     ]
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.772551,
  //     "cashOutRisk": 0.58988,
  //     "networkFailureRisk": 0.8
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0069",
  //   "bankId": "ACCESS-003",
  //   "location": {
  //     "branchName": "Access Bank - Yaba",
  //     "address": "153 Yaba Street, Lagos",
  //     "lga": "Yaba",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.508535,
  //       "lng": 3.383186
  //     }
  //   },
  //   "model": "NCR SelfServ 80",
  //   "type": "FULL_FUNCTION",
  //   "status": "MAINTENANCE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "CONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 18512399,
  //     "currentAmount": 17351659,
  //     "lowThreshold": 4628099,
  //     "emptyThreshold": 925619
  //   },
  //   "powerStatus": {
  //     "mains": true,
  //     "generator": false,
  //     "inverter": true,
  //     "fuelLevel": 74
  //   },
  //   "telemetry": {
  //     "temperatureC": 28,
  //     "errorCodes": []
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.404597,
  //     "cashOutRisk": 0.354145,
  //     "networkFailureRisk": 0.053181
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0070",
  //   "bankId": "UBA-004",
  //   "location": {
  //     "branchName": "UBA - Ikoyi",
  //     "address": "146 Ikoyi Street, Lagos",
  //     "lga": "Ikoyi",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.436322,
  //       "lng": 3.424367
  //     }
  //   },
  //   "model": "Diebold Opteva 520",
  //   "type": "FULL_FUNCTION",
  //   "status": "ONLINE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "CONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 16962534,
  //     "currentAmount": 19163013,
  //     "lowThreshold": 4240633,
  //     "emptyThreshold": 848126
  //   },
  //   "powerStatus": {
  //     "mains": true,
  //     "generator": true,
  //     "inverter": true,
  //     "fuelLevel": 9
  //   },
  //   "telemetry": {
  //     "temperatureC": 27,
  //     "errorCodes": []
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.046924,
  //     "cashOutRisk": 0.446824,
  //     "networkFailureRisk": 0.165997
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0071",
  //   "bankId": "FIRST-005",
  //   "location": {
  //     "branchName": "First Bank - Apapa",
  //     "address": "15 Apapa Street, Lagos",
  //     "lga": "Apapa",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.452601,
  //       "lng": 3.362095
  //     }
  //   },
  //   "model": "NCR SelfServ 80",
  //   "type": "FULL_FUNCTION",
  //   "status": "OFFLINE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "DISCONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 17855799,
  //     "currentAmount": 3392490,
  //     "lowThreshold": 4463949,
  //     "emptyThreshold": 892789
  //   },
  //   "powerStatus": {
  //     "mains": false,
  //     "generator": false,
  //     "inverter": true,
  //     "fuelLevel": 56
  //   },
  //   "telemetry": {
  //     "temperatureC": 26,
  //     "errorCodes": [
  //       "E404"
  //     ]
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.772551,
  //     "cashOutRisk": 0.819385,
  //     "networkFailureRisk": 0.8
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0072",
  //   "bankId": "FID-006",
  //   "location": {
  //     "branchName": "Fidelity Bank - Ajah",
  //     "address": "194 Ajah Street, Lagos",
  //     "lga": "Ajah",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.489114,
  //       "lng": 3.565809
  //     }
  //   },
  //   "model": "Diebold Opteva 520",
  //   "type": "FULL_FUNCTION",
  //   "status": "MAINTENANCE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "CONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 19999066,
  //     "currentAmount": 14931327,
  //     "lowThreshold": 4999766,
  //     "emptyThreshold": 999953
  //   },
  //   "powerStatus": {
  //     "mains": true,
  //     "generator": false,
  //     "inverter": true,
  //     "fuelLevel": 17
  //   },
  //   "telemetry": {
  //     "temperatureC": 26,
  //     "errorCodes": []
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.654877,
  //     "cashOutRisk": 0.551717,
  //     "networkFailureRisk": 0.168541
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0073",
  //   "bankId": "ZENITH-001",
  //   "location": {
  //     "branchName": "Zenith Bank - Victoria Island",
  //     "address": "177 Victoria Island Street, Lagos",
  //     "lga": "Victoria Island",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.432098,
  //       "lng": 3.424161
  //     }
  //   },
  //   "model": "NCR SelfServ 80",
  //   "type": "FULL_FUNCTION",
  //   "status": "ONLINE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "CONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 18274041,
  //     "currentAmount": 10582531,
  //     "lowThreshold": 4568510,
  //     "emptyThreshold": 913702
  //   },
  //   "powerStatus": {
  //     "mains": true,
  //     "generator": false,
  //     "inverter": true,
  //     "fuelLevel": 78
  //   },
  //   "telemetry": {
  //     "temperatureC": 27,
  //     "errorCodes": []
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.054593,
  //     "cashOutRisk": 0.820684,
  //     "networkFailureRisk": 0.05739
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0074",
  //   "bankId": "GTB-002",
  //   "location": {
  //     "branchName": "GTBank - Lekki Phase 1",
  //     "address": "58 Lekki Phase 1 Street, Lagos",
  //     "lga": "Lekki Phase 1",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.451996,
  //       "lng": 3.473551
  //     }
  //   },
  //   "model": "Diebold Opteva 520",
  //   "type": "FULL_FUNCTION",
  //   "status": "OFFLINE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "DISCONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 17894569,
  //     "currentAmount": 3866089,
  //     "lowThreshold": 4473642,
  //     "emptyThreshold": 894728
  //   },
  //   "powerStatus": {
  //     "mains": false,
  //     "generator": false,
  //     "inverter": true,
  //     "fuelLevel": 74
  //   },
  //   "telemetry": {
  //     "temperatureC": 27,
  //     "errorCodes": [
  //       "E404"
  //     ]
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.772551,
  //     "cashOutRisk": 0.444747,
  //     "networkFailureRisk": 0.8
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  // },
  // {
  //   "id": "ATM-LAG-0075",
  //   "bankId": "ACCESS-003",
  //   "location": {
  //     "branchName": "Access Bank - Ikeja",
  //     "address": "153 Ikeja Street, Lagos",
  //     "lga": "Ikeja",
  //     "state": "Lagos",
  //     "coordinates": {
  //       "lat": 6.606275,
  //       "lng": 3.354143
  //     }
  //   },
  //   "model": "NCR SelfServ 80",
  //   "type": "FULL_FUNCTION",
  //   "status": "MAINTENANCE",
  //   "lastUpdated": "2025-11-14T12:37:26.541Z",
  //   "networkStatus": "CONNECTED",
  //   "cashLevel": {
  //     "totalCapacity": 18512399,
  //     "currentAmount": 16999496,
  //     "lowThreshold": 4628099,
  //     "emptyThreshold": 925619
  //   },
  //   "powerStatus": {
  //     "mains": true,
  //     "generator": true,
  //     "inverter": true,
  //     "fuelLevel": 9
  //   },
  //   "telemetry": {
  //     "temperatureC": 28,
  //     "errorCodes": []
  //   },
  //   "predictiveScore": {
  //     "failureRisk": 0.601556,
  //     "cashOutRisk": 0.170566,
  //     "networkFailureRisk": 0.170566
  //   },
  //   "createdAt": "2025-11-14T12:37:26.541Z",
  //   "updatedAt": "2025-11-14T12:37:26.541Z"
  }
]

export default mockAtms;
