import { getSavedJobs } from "@/api/Jobsapi";
import Jobcard from "@/components/Jobcard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJob = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-violet-800 via-violet-600 to-white font-extrabold text-6xl sm:text-7xl text-center pb-10">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mb-7 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs?.map((saved) => {
              return (
                <Jobcard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
                />
              );
            })
          ) : (
            <div className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-indigo-500 to-white font-bold text-xl">No Saved Jobs!!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJob;
