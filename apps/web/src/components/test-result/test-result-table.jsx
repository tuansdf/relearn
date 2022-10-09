import dayjs from "dayjs";

export default function TestResultTable({ testResults }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th />
            <th>Username</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {testResults.map((testResult, index) => (
            <tr key={testResult._id}>
              {/* index */}
              <th>{index + 1}</th>
              {/* username */}
              <td>{testResult.user.username}</td>
              {/* score */}
              <td>{testResult.score}</td>
              {/* date */}
              <td>{dayjs(testResult.createdAt).format("DD/MM/YYYY h:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
