import React from 'react';
  import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentFormComponent from './CommentFormComponent';
import { Loading } from './LoadingComponent';

    function RenderDish({dish, isLoading, errMess}) {
        if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
    }
    function RenderComm({comments, addComment, dishId}) {
        if (comments != null){      
                const cmt = comments.map(c => {
                return(
                    <div>
                    <p>{c.comment}</p>
                    <p>-- {c.author},&nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(c.date))}
                        </p>
                    </div>
                )
                });
                return(
                <div>{cmt}
                    <CommentFormComponent dishId={dishId} addComment={addComment} /></div>
                )  
        }
    else
        return(
            <div></div>
        );
    }

    const DishdetailComponent = (props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish == null) {
            return (<div></div>)
        }
        else
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish}/>
            </div>
            <div className="col-12 col-md-5 m-1"> 
                <h2>Comments</h2>
                <RenderComm comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                />
            </div>
            </div>
            </div>
        )
    }


  export default DishdetailComponent;