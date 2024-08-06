// import './App.css';
export default function Home() {
    return (
       <div className="flex flex-col justify-center items-center my-40 px-2">
         <p className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-300 ">
            Write.<br/>
            Plan.Execute.
        </p>
        {/* <div className="circular-pattern"></div> */}
        <p className="text-lg lg:text-2xl font-sans text-center font-medium my-8">
            Welcome to P-Tool!<br/>
            A simple tool for managing your daily tasks
        </p>
       </div>
    )
}