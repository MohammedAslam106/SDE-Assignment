import { NextRequest, NextResponse } from "next/server"
import Project  from "@/models/projects"
import { connect } from "@/dbConfig/dbConfig"
connect()

export async function GET(request:Request){
    try {
        const response=await Project.aggregate([
            {
            $lookup: {
                from: "files",
                localField: "_id",
                foreignField: "projectId",
                as: "mediaFiles"
            }
            },
            {
            $addFields: {
                media_file_count: { $size: "$mediaFiles" }
            }
            },
            {
            $project: {
                mediaFiles: 0 // Exclude mediaFiles array from the final output
            }
            }
        ]);
        return NextResponse.json({data:response})
    } catch (error:any) {
        console.log(error)
        return Response.json({error:error.message})
    }
}