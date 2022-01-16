const Constants = {
    originWhiteList: [
        "https://test-site.codes:5400"
    ],
    
    H264: {
        res_480p: {
            minBitRate: "600k",
            maxBitRate: "700k",
            level: "3.1"
        }

        res_720p: {
            minBitRate: "2000k",
            maxBitRate: "2400k",
            level: "4.0"
        }
    },
    
    JWTexpireTime: 8 * 60 * 60
}


module.exports = Constants;