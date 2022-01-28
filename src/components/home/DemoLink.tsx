export default function DemoLink() {
  return (
    <div className="bg-secondary text-primary py-20 px-4 md:px-16">
      <div className="mx-auto max-w-6xl flex flex-row items-center">
        <h2 className="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9">
            Try out our demo mode:
        </h2>
        <div>
          <a href="demo"><button id='open-demo-btn' className="focus:outline-none w-32 lg:w-44 whitespace-nowrap focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 bg-transparent transition duration-150 ease-in-out hover:border-sky-500 lg:text-xl lg:font-bold  hover:text-sky-500 rounded border border-sky-700 dark:border-sky-600 text-sky-700/90 dark:text-sky-600 py-2 sm:py-4 text-md">Demo</button></a>
        </div>
      </div>
    </div>
  );
}
