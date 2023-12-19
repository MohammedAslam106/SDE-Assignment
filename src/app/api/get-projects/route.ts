import { db } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import Project  from "@/models/projects"
import File from '@/models/media_file'
import { connect } from "@/dbConfig/dbConfig"
connect()

export async function GET(request:Request){
    try {
        // const res=await client.sql `SELECT projects.*, COUNT(media_file.project_id) AS episode_count
        // FROM projects
        // LEFT JOIN media_file ON projects.id = media_file.project_id
        // GROUP BY projects.id ORDER BY projects.id;`
        const res=await Project.find()
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