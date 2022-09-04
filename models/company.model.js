const mongoose = require("mongoose");
const {companyVerificationStatuses} = require("../utils/constants");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        verified: {
            type: String,
            default: companyVerificationStatuses.pending,
            enum: [
                companyVerificationStatuses.pending,
                companyVerificationStatuses.approved,
                companyVerificationStatuses.rejected
            ]
        },
        jobsPosted: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Job"
        },
        hrs:{
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "User"
        }
    },
    {timestamps: true, versionKey: false}
)

module.exports = mongoose.model("company", companySchema)