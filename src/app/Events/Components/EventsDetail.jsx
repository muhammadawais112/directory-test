import React, { useEffect, useState } from "react";
import { useAppServices } from "../../../hook/services";
import { useAgencyInfo } from "../../../context/agency";
import { useUserInfo } from "../../../context/user";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import Loader from "../../../components/loader";
import sample from "../../../assets/Home/sample.svg";
import Pagination from "../../../components/Pagination/Pagination";
import { formatDate } from "../../../utils/Helper";
import MapContainer from "../../../components/Map/MapContainer";
import { BsCheck } from "react-icons/bs";

const EventsDetail = () => {
  const Service = useAppServices();
  const [agency] = useAgencyInfo();
  const [user] = useUserInfo();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [eventActivities, setEventActivities] = useState([]);
  const [event, setEvent] = useState({});
  const theme_content = agency?.theme_id?.theme_data;
  const [eventsData, setEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 items per page
  // Calculate pagination
  const totalItems = eventsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = eventsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { agency_id, slug } = useParams();
  let middleware = `/`;
  if (agency_id) {
    middleware = `/app/${agency_id}/`;
  }

  const getSingleEvent = async () => {
    const { response } = await Service.events.GetSingleEvent({
      query: `agency_id=${agency._id}&slug=${slug}`,
    });
    if (response) {
      setEvent(response?.data);
    }
  };

  useEffect(() => {
    getSingleEvent();
  }, [slug]);

  const getEvents = async () => {
    const { response } = await Service.events.Get({
      query: `agency_id=${agency._id}`,
    });
    if (response) {
      setEventsData(response.data); // Assuming API returns a list of events
      setLoader(false);
    }
  };

  const getEventActivities = async () => {
    try {
      const { response } = await Service.accounts.getApplyForEvent({
        query: `account_id=${user?._id}`,
      });

      if (response?.success && Array.isArray(response.data)) {
        setEventActivities(response.data);
      } else {
        console.error("Failed to fetch event activities:", response?.message);
        setEventActivities([]); // Ensure it's an array
      }
    } catch (error) {
      console.error("Error fetching event activities:", error);
    }
  };

  const isEventMarked = (eventId, action) => {
    const activity = eventActivities?.find(
      (activity) => activity.event_id === eventId
    );
    return activity ? activity[action] : false;
  };

  useEffect(() => {
    getEvents();
    getEventActivities();
  }, []);

  if (!event) {
    return (
      <p className="text-center text-gray-500">No event data available.</p>
    );
  }

  const handleViewDetails = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    navigate(`${middleware}event-detail/${event?.slug}`);
  }; // It should log the API key to the console

  const relatedEvents = eventsData.filter(
    (e) => e?.event_name !== event?.event_name
  );

  const handleEventAction = async (eventId, action) => {
    try {
      const existingActivity = eventActivities?.find(
        (activity) => activity?.event_id === eventId
      );

      const isCurrentlyMarked = existingActivity
        ? existingActivity[action]
        : false;

      console.log("existingActivity", existingActivity);

      const payload = {
        _id: existingActivity?._id, // Include `_id` for updates
        event_id: eventId,
        account_id: user?._id,
        agency_id: agency?._id,
        interested:
          action === "interested"
            ? !isCurrentlyMarked
            : existingActivity?.interested || false,
        going:
          action === "going"
            ? !isCurrentlyMarked
            : existingActivity?.going || false,
      };

      const { response } = await Service.accounts.applyForEvent({ payload });

      if (response?.success) {
        setEventActivities((prev = []) => {
          const updatedActivities = prev.filter(
            (activity) => activity?.event_id !== eventId
          );
          updatedActivities.push(response?.data);
          return updatedActivities;
        });

        await Promise.all([getEventActivities()]);

        if (action === "interested") {
          toast.success(
            isCurrentlyMarked
              ? "Marked as Not Interested"
              : "Marked as Interested"
          );
        } else if (action === "going") {
          toast.success(
            isCurrentlyMarked ? "Canceled Going" : "Marked as Going"
          );
        }
      } else {
        console.error(`Failed to toggle event ${action}:`, response?.message);
      }
    } catch (error) {
      console.error(`Error toggling event ${action}:`, error);
    }
  };

  console.log(event, "event123");

  const formatTo12Hour = (time24) => {
    const [hour, minute] = time24?.split(":");
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="">
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : eventsData.length > 0 ? (
        <>
          <img
            src={event?.image || sample}
            alt="banner"
            className="!w-full h-[500px] object-cover"
          />
          <div className="w-[90%] lg:w-[1170px] mx-auto py-[60px]">
            <div className="w-[90%] lg:w-[1170px] mx-auto pb-[60px]">
              <div className="w-full">
                <div className="bg-white p-6 rounded-lg shadow w-full  my-8">
                  <h1 className="text-xl font-bold mb-4">
                    {event?.event_name} - (
                    {event?.event_date}
                    )
                  </h1>
                  <div
                    className="text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: event?.event_description?.replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  ></div>

                  <h2 className="text-xl font-semibold mb-4">{event?.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>{event?.event_location}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Event Date</p>
                      <p>
                        {/* {event?.event_end_time} */}
                        {event?.event_date}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Start Time</p>
                      <p>
                        {/* {event?.event_start_time} */}
                        {formatTo12Hour(event?.event_start_time)}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">End Time</p>
                      <p>
                        {/* {event?.event_end_time} */}
                        {formatTo12Hour(event?.event_end_time)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-8 space-x-2">
                      <button
                        style={{
                          background:
                            theme_content?.general?.button_bg || "#EF4444",
                          color: theme_content?.general?.button_text || "#fff",
                        }}
                        onClick={() =>
                          user?._id
                            ? handleEventAction(event._id, "interested")
                            : navigate("/login")
                        }
                        className={`px-4 py-2 rounded-md text-sm ${
                          isEventMarked(event._id, "interested")
                            ? "bg-red-600 text-white hover:bg-red-700 transition"
                            : `bg-green-600 text-white hover:bg-green-700 transition`
                        }`}
                      >
                        {user._id ? (
                          isEventMarked(event?._id, "interested") ? (
                            <>
                              <BsCheck className="inline-block mr-2 text-lg" />
                              Interested
                            </>
                          ) : (
                            "Interested"
                          )
                        ) : (
                          "Login to Mark Interested"
                        )}
                      </button>

                      <button
                        style={{
                          background:
                            theme_content?.general?.button_bg || "#EF4444",
                          color: theme_content?.general?.button_text || "#fff",
                        }}
                        onClick={() => user?._id ? handleEventAction(event?._id, "going") :  navigate("/login")}
                        className={`px-4 py-2 rounded-md text-sm ${
                          isEventMarked(event._id, "going")
                            ? "bg-red-600 text-white hover:bg-red-700 transition"
                            : "bg-green-600 text-white hover:bg-green-700 transition"
                        }`}
                      >
                        {user._id ? (
                          isEventMarked(event?._id, "going") ? (
                            <>
                              <BsCheck className="inline-block mr-2 text-lg" />
                              Attending
                            </>
                          ) : (
                            "Attending"
                          )
                        ) : (
                          "Login to Mark Attending"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <MapContainer
                      height="400px"
                      addresses={event?.event_location}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedBlogs.map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleViewDetails(event)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${event.event_name}`}
                >
                  <div className="relative h-48">
                    <img
                      src={event?.image || sample}
                      alt={event?.event_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = sample; // Fallback image
                      }}
                    />
                    {event?.event_date && (
                      <div className="px-[23px] py-2 bg-white rounded-xl absolute bottom-[-20px] right-[20px] shadow text-center">
                        <p className="text-sm text-gray-600">
                          {new Date(event.event_date).toLocaleString("en-US", {
                            month: "short",
                          })}
                        </p>
                        <span className="font-semibold text-gray-800">
                          {new Date(event.event_date).getDate()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {event.event_name}
                    </h2>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center">
                        <i className="fas fa-clock text-gray-500 mr-2"></i>
                        {formatTo12Hour(event.event_start_time)} -{" "}
                        {formatTo12Hour(event.event_end_time)}
                      </p>
                      <p className="flex items-center">
                        <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                        {event.event_location}
                      </p>
                    </div>

                    <button
                      onClick={() => handleViewDetails(event)}
                      className="w-full mt-4 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                      style={{
                        background:
                          theme_content?.general?.button_bg || "#EF4444",
                        color: theme_content?.general?.button_text || "#fff",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-12">
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="/empty-state.svg" // Add an illustration for empty state
            alt="No events found"
            className="w-48 h-48 mb-6"
          />
          <p className="text-xl text-gray-600">No Events Found</p>
        </div>
      )}
    </div>
  );
};

export default EventsDetail;
