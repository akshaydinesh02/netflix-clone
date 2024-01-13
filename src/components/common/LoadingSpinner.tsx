const LoadingSpinner = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-50">
      <p className="text-red-500">Loading</p>
      <div
        className="w-10 h-10 bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage:
            'url("https://assets.nflxext.com/en_us/pages/wiplayer/site-spinner.png")',
        }}
      >
        <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
