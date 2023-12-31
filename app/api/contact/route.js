import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const {
    region,
    regulation,
    cid,
    domain,
    subdomain,
    keyword,
    control_objective,
    steps,
    refid,
    clause,
  } = await req.json();

  try {
    await connectDB();
    await Contact.create({
      region,
      regulation,
      cid,
      domain,
      subdomain,
      keyword,
      control_objective,
      steps,
      refid,
      clause,
    });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to send message."] });
    }
  }
}
