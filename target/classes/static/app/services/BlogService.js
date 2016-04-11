
(function() {
    angular.module("soloApp")
        .factory("BlogService", ['$http', BlogService]);

    function BlogService($http) {
        return {
            addBlog: addBlog,
            getAllBlogs: getAllBlogs,
            getBlogDetails: getBlogDetails,
            editBlog: editBlog,
            addComment: addComment
        };

        function addComment(id, comment) {
            return $http({
                method: "POST",
                url: "/addComment",
                data: {id: id, author: comment.author, body: comment.body},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }
        function addBlog(o) {
            return $http({
                method: "POST",
                url: "/addBlog",
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
                data: {id: id, text: blog.text, name: blog.name, img: blog.mainImg,  urls: blog.urls},
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