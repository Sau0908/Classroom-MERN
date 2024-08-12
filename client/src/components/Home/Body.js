import React from "react";
import { TextField, Button } from "@mui/material";

const Body = () => {
  return (
    <>
      <h1 className="text-4xl font-bold p-6 mb-8">
        Welcome to Our School Community
      </h1>
      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            A Message from the Principal
          </h2>
          <p className="text-gray-600 mb-2">Dear Students and Parents,</p>
          <p className="text-gray-600 mb-4">
            Welcome to a new academic year! We are excited to embark on this
            journey together and are committed to providing a nurturing and
            stimulating environment for our students. Our goal is to inspire and
            equip them with the knowledge and skills they need to succeed. Let’s
            work together to make this year a memorable and successful one.
          </p>
          <p className="text-gray-600">
            Sincerely,
            <br />
            Dr. Sheela Singh
            <br />
            Principal
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            A Note from the Founder
          </h2>
          <p className="text-gray-600 mb-2">Dear Community Members,</p>
          <p className="text-gray-600 mb-4">
            It’s an honor to be part of this journey with you. Our vision has
            always been to foster a learning environment where innovation and
            creativity thrive. As we move forward, I encourage you to embrace
            the opportunities for growth and collaboration. Together, we can
            achieve great things and make a lasting impact.
          </p>
          <p className="text-gray-600">
            Warm regards,
            <br />
            Dr. Pradeep Singh
            <br />
            Founder
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Drop a Message
        </h2>
        <div className="text-center mt-8">
          <TextField
            label="Your Name"
            variant="outlined"
            className="w-full  mb-4"
            InputProps={{
              className: "border-gray-300 rounded-lg mb-4",
            }}
          />
          <br />
          <TextField
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            className="w-full  mb-4"
            InputProps={{
              className: "border-gray-300 rounded-lg mb-4",
            }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            className="px-4 py-2 rounded-lg w-full"
          >
            Send Message
          </Button>
        </div>
      </div>
    </>
  );
};

export default Body;
