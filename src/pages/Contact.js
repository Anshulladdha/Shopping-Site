import React from "react";
import Layout from "../components/layout/layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact=()=>{
    return (
        <Layout title={"Contact us"}>
        <br></br><br></br><br></br><br></br>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/contact.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-2">
              Any query and info about product feel free to call anytime we 24X7
              Available
            </p>
            <p className="mt-3">
              <BiMailSend /> : ansladdha23@gmail.com
            </p>
            <p className="mt-3">
              <BiPhoneCall /> : 80033XXXXXX
            </p>
            <p className="mt-3">
              <BiSupport /> : 1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
      </Layout>
    )
};

export default Contact;