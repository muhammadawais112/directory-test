import { useState } from "react";
import { useRouter } from "next/navigation";
import blogImage from '../../../../app/assets/Blogs/main.png';
import { useAgencyInfo } from "../../../context/agency";

function BusinessBlogs({ blogsData }) {
  const [visibleBlogs, setVisibleBlogs] = useState(4);
  const [agency] = useAgencyInfo();
  const theme_content = agency?.theme_id?.theme_data;
  const navigate = useRouter();

  let middleware = `/`;
  if (agency._id) {
    middleware = `/app/${agency._id}/`;
  }

  const toggleBlogs = () => {
    if (visibleBlogs === 4) {
      setVisibleBlogs(blogsData.length);
    } else {
      setVisibleBlogs(4);
    }
  };


  const handleViewDetails = (blog) => {
    window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    navigate(`${middleware}blog-detail/${blog?.slug}`,);
  };

  return (
    <section class="bg-white light:bg-gray-900 rounded-md">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="grid gap-8 lg:grid-cols-2">
          {blogsData.slice(0, visibleBlogs).map((blog, index) => (
            <article
              key={index}
              onClick={() => handleViewDetails(blog)}
              class="p-6 bg-white rounded-lg border cursor-pointer border-gray-200 shadow-md light:bg-gray-800 light:border-gray-700"
            >
              <div class="mb-4">
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  src={blog.image || blogImage}
                  alt="Blog Cover"
                />
              </div>

              <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 light:text-white">
                <div href="#">{blog?.title}</div>
              </h2>
              <p class="mb-5 font-light text-gray-500 light:text-gray-400">
                {/* remove html and get first 100 words */}
                {blog?.description
                  .replace(/<[^>]*>?/gm, "")
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}
                ...
              </p>
            </article>
          ))}
        </div>

        <div class="text-center mt-6">
          {blogsData.length > 4 && (
            <button
              style={{
                background: theme_content?.general?.button_bg || "#00A6A9",
                color: theme_content?.general?.button_text || "#fff",
              }}
              onClick={toggleBlogs}
              class="px-6 py-2 rounded-md"
            >
              {visibleBlogs === 4 ? "Show More" : "Show Less"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default BusinessBlogs;
