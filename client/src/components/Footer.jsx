import Logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full bg-black p-8 mt-14">
      <div className="flex items-center justify-center ">
        <img src={Logo} alt="logo-ct" className="w-10 justify-center" />
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <div className="text-white flex flex-col md:flex-row justify-between items-start mx-auto">
        {/* Contact Information */}
        <div className="mb-4 md:mb-0">
          <h3 className="underline">Contact Us:</h3>
          <ul>
            <li>Phone: (555)-657-8965</li>
            <li>Email: urbanvogue@gmail.com</li>
            <li>Address: 555 Deer Rd, Moonview, AK, 55555</li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-20">
          <p className="text-white italic font-normal mt-4 md:mt-0">
            &copy; 2023 Urban Vogue
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
