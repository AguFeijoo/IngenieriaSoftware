function addReview(name, rating, comment){
    if(name.trim() == "" || rating == "0"){
        return null;
    }

    let review = {
        name: name.trim(),
        rating: rating,
        comment: comment
    };

    return review;
}

if (typeof module !== "undefined") { module.exports = { addReview }; }