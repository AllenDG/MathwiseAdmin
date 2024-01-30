import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import useFetchAllUsersData from "../hooks/useFetchAllUsersData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RecentUsers from "../components/RecentUsers";

export default function DashboardScreen() {
  const { users, loading } = useFetchAllUsersData();
  const [usersByMonth, setUsersByMonth] = useState([]);

  useEffect(() => {
    if (!loading) {
      const usersDataByMonth = users.reduce((acc, user) => {
        const date = new Date(user.createdAt);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        const existingMonth = acc.find(entry => entry.monthYear === monthYear);
        if (existingMonth) {
          existingMonth.count += 1;
        } else {
          acc.push({ monthYear, count: 1 });
        }
        return acc;
      }, []);
      setUsersByMonth(usersDataByMonth);
    }
  }, [users, loading]);

  const formatXAxis = (tickItem) => {
    return isNaN(tickItem) ? "NaN/NaN" : tickItem;
  };

  return (
    <div className="w-full p-6">
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row gap-3">
            <div className="w-full bg-gray-200 rounded-lg p-3">
              <h2 className="text-xl font-semibold mb-2">Users by Month</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={usersByMonth}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthYear" tickFormatter={formatXAxis} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <RecentUsers users={users}/>
          </div>
        </>
      )}
    </div>
  );
}
