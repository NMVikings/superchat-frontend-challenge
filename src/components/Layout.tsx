const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-gray-100 w-screen mx-auto py-6 px-6 lg:px-8 flex justify-center h-screen">
      <div className="mt-12 sm:flex-grow max-w-xl">{children}</div>
    </div>
  );
};

export default Layout;
