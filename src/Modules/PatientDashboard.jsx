import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserEdit,
  FaHeartbeat,
  FaThermometerHalf,
  FaWeight,
  FaLungs,
  FaNotesMedical,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { gql, useQuery } from "@apollo/client";
import Header from "./Header";

export default function PatientDashboard() {
  const { loginData } = useContext(AuthContext);
  const GET_DAILY_INFO = gql`
    query GetDailyInfoByPatientId($patientId: String!) {
      getDailyInfoByPatientId(patientId: $patientId) {
        patientId
        weight
        bloodPressure
        pulseRate
        temperature
        respiratoryRate
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_DAILY_INFO, {
    variables: { patientId: loginData.id }, // Pass the id variable here
  });

  useEffect(()=> {
    refetch();
  },[loginData])

  return (
    <div className="bg-white">
      <Header />
      <div className="mx-auto mt-4 px-6 py-0 rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Patient Dashboard
        </h2>
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium text-blue-600">
              Patient Details <FaUserEdit />
            </h3>
          </div>
          {loginData && (
            <div className="grid grid-cols-8 gap-y-2">
              <div>
                <p className="text-sm text-gray-600">Name:</p>
                <p>{loginData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age:</p>
                <p>{loginData.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p>{loginData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender:</p>
                <p>{loginData.gender}</p>
              </div>
            </div>
          )}
        </div>
        {loading && (
            <p> Fetching Daily Info</p>
        )}{(data && data.getDailyInfoByPatientId && data.getDailyInfoByPatientId.length!==0) && (
            <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Daily Information</h3>
            <div className="flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <FaHeartbeat /> Pulse Rate: {data.getDailyInfoByPatientId[0].pulseRate}
              </div>
              <div className="flex items-center mb-2">
                <FaThermometerHalf /> Blood Pressure: {data.getDailyInfoByPatientId[0].bloodPressure}
              </div>
              <div className="flex items-center mb-2">
                <FaWeight /> Weight: {data.getDailyInfoByPatientId[0].weight}
              </div>
              <div className="flex items-center mb-2">
                <FaThermometerHalf /> Temperature: {data.getDailyInfoByPatientId[0].temperature}
              </div>
              <div className="flex items-center mb-2">
                <FaLungs /> Respiratory Rate: {data.getDailyInfoByPatientId[0].respiratoryRate}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">
            Symptoms
            <FaNotesMedical />
          </h3>
          <p>{""}</p>
        </div>
        <div className="flex flex space-x-4">
          <Link
            to="/daily-information"
            className="py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Record Daily Info
          </Link>
          <Link
            to="/symptom-checklist"
            className="py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log Symptoms
          </Link>
        </div>
        <br></br>
      </div>
    </div>
  );
}
