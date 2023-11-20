import Logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full bg-black p-8 mt-14">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-black text-center md:justify-between ">
        <img src={Logo} alt="logo-ct" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <a
              href="#"
              className="text-white font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <p className="text-center text-white font-normal">
        &copy; 2023 Urban Vogue
      </p>
    </footer>
  );
}

export default Footer;
