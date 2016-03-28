
(function() {
    angular.module("soloApp")
        .factory("BlogService", ['$http', BlogService]);

    function BlogService($http) {
        return {
            getAllBlogs: getAllBlogs,
            getBlogDetails: getBlogDetails
        };

        function addBlog(blog, urls) {
            return $http({
                method: "POST",
                url: "/addBlog",
                params: {body: blog.body, name: blog.name, mainImg: blog.mainImg,  urls: urls},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getAllBlogs() {
            return $http({
                url: "/getAllBlogs",
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getBlogDetails(blogId) {
            return $http({
                url: "/getBlogDetails",
                responseType: "json",
                params: {blogId: blogId}
            }).then(function (response) {
                return response.data;
            });
        }
    }
}());