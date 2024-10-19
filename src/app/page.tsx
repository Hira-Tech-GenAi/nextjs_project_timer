import Countdown from "@/components/countdown";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/keyboard-tea-cup-apple-office-stationeries-black-background_23-2148042011.jpg?t=st=1727335413~exp=1727339013~hmac=7a9c7fcaef11a5cb320d676bdc06419dc2ed6e83fa6e678497ebcd7b9522f96d&w=740)",
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Countdown Timer
        </h1>
        <Countdown />
        <p className="mt-4 text-gray-600">Time left until the big event!</p>
      </div>
    </div>
  );
}
