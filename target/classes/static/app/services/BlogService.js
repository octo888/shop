
(function() {
    angular.module("soloApp")
        .factory("BlogService", ['$http', BlogService]);

    function BlogService($http) {
        return {
            addBlog: addBlog,
            getAllBlogs: getAllBlogs,
            getBlogDetails: getBlogDetails,
            editBlog: editBlog
        };

        function addBlog(o) {
            return $http({
                method: "POST",
                url: "/addBlog",
               // params: {name: blog.name, text: text, mainImg: blog.mainImg,  urls: urls},
                data: {name: o.name, img: o.img, text: o.text, urls: o.urls},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function editBlog(id, blog) {
            return $http({
                method: "POST",
                url: "/editBlog",
                params: {id: id, body: blog.body, name: blog.name, mainImg: blog.mainImg,  urls: blog.urls},
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