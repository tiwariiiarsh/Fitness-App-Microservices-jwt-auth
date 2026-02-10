import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

const ActivityPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 flex justify-center">
      
      {/* PAGE CONTAINER */}
      <div className="w-full max-w-5xl">

        {/* DASHBOARD TITLE (TOP MOST) */}
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
          💪 Fitness Dashboard
        </h1>

        {/* ADD ACTIVITY (TOP SECTION) */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Add New Activity
          </h2>

          <ActivityForm />
        </div>

        {/* ACTIVITY LIST (BOTTOM SECTION) */}
        <div className="bg-white p-6 rounded-xl shadow items-center  ">
          
          {/* ✅ CENTERED HEADING */}
          <h2 className="text-3xl font-semibold mb-6 text-center pb-4">
            🗂 Activity History
          </h2>

          <ActivityList />
        </div>

      </div>
    </div>
  );
};

export default ActivityPage;
