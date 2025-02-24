import { useSelector } from "react-redux";

const Footer = () => {
  // Get user info from Redux store
  const userInfo = useSelector((state) => state.user?.userInfo);
  // Check if user is admin (assuming `role` is a property in `userInfo`)
  if (userInfo?.isAdmin) {
    return null; // Don't render footer for admin users
  }

  return (
    <footer className="bg-black text-white mt-10 text-center py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {/* Company Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Company</h6>
          <ul className="space-y-2">
            <li>About</li>
            <li>Blog</li>
            <li>Jobs</li>
            <li>Press</li>
            <li>Partners</li>
          </ul>
        </div>
        
        {/* Solutions Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Solutions</h6>
          <ul className="space-y-2">
            <li>Marketing</li>
            <li>Analytics</li>
            <li>Commerce</li>
            <li>Insights</li>
            <li>Support</li>
          </ul>
        </div>
        
        {/* Documentation Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Documentation</h6>
          <ul className="space-y-2">
            <li>Guides</li>
            <li>API Status</li>
          </ul>
        </div>
        
        {/* Legal Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Legal</h6>
          <ul className="space-y-2">
            <li>Claim</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-sm">
        <p>&copy; 2023 My Company. All rights reserved.</p>
        <p>Made with love by Me.</p>
        <p>
          Icons made by
          <a href="https://www.freepik.com" className="text-blue-400 hover:underline mx-1">Freepik</a>
          from
          <a href="https://www.flaticon.com/" className="text-blue-400 hover:underline mx-1">www.flaticon.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
