import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import parse from "html-react-parser";
import { Container } from "react-bootstrap";

const Reviews = ({ isHomePage, children }) => {
    // const reviews = useStaticQuery(graphql`
    //     query reviews {
    //         allGooglePlacesReview(filter: {rating: {gte: 4}}) {
    //             edges {
    //                 reviews: node {
    //                     id
    //                     author_name
    //                     author_url
    //                     profile_photo_url
    //                     rating
    //                     relative_time_description
    //                     text
    //                 }
    //             }
    //         }
    //     }
    // `)

    return (
        <Container fluid className="header_lighten header_wrap">
            {/*{*/}
            {/*    reviews.allGooglePlacesReview.edges.map((review) => {*/}
            {/*        const photo_url = review.reviews.profile_photo_url;*/}

            {/*        return (*/}
            {/*            <Row key={review.reviews.id} className="review-item">*/}
            {/*                <div className="card-body">*/}
            {/*                    <i className="fa fa-quote-left u-color" />*/}
            {/*                    {parse(review.reviews.text)}*/}

            {/*                    <div className="d-flex justify-content-between align-items-center">*/}
            {/*                        <div className="user-about">*/}
            {/*                            <p><strong>{review.reviews.author_name}</strong></p>*/}
            {/*                            <div className="d-flex flex-row mt-1">*/}
            {/*                                {[...Array(review.reviews.rating)].map((e, i) => <i className="fas fa-star" key={i} />)}*/}
            {/*                                {[...Array(5-review.reviews.rating)].map((e, i) => <i className="far fa-star" key={i} />)}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className="user-image">*/}
            {/*                            <img src={photo_url} alt={`${review.reviews.author_name}'s Profile Image`} className="rounded-circle" width={50} />*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Row>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
        </Container>
    )
}

export default Reviews
