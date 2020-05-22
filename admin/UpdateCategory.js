import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { updateCategory, getCategory } from './helper/adminapicall';



const UpdateCategory = ({match}) => {

    
    const [values, setValues] = useState({
        name: "",
        error: false,
        success: false
    });

    const {name, success, error} = values;

    const {user, token} = isAutheticated();

    const preload = categoryId => {
        getCategory(categoryId).then(data => {
          if (data?.error) {
            setValues({...values, error: data?.error});
          } else {
            setValues({...values, name:data?.name});
           }
        });
      };

      useEffect(() => {
        preload(match.params.categoryId);
      }, []);
    


    const goback = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3 " 
            to ="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = event => {
        const value= event.target.value;
        setValues({...values, name: value});
    };

   
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: ""})

        const category = {
            name : name
        }
         updateCategory(match.params.categoryId, user._id, token, category )
        .then(data => {
            if (data?.error) {
            setValues({...values, error:data?.error});
            } else {
            setValues({...values, name: data, success:true});
            }
          }
        )
      };

    const successMessage = () => {
        if(success) {
            return <h4 className="text-success">Category updated Successfully</h4>;
        }
    }; 

    const errorMessage = () => {
        if(error) {
            return <h4 className="text-success">Failed to update Category</h4>;
        }
    };


    const myCategoryForm = () => {
       return(
        <form>
        <div className="form-group">
            <p className="lead">
                Enter the Category
            </p>
            <input 
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For ex. Summer" 
            />
            <button 
            onClick={onSubmit}
            className="btn btn-outline-info">
                Update Category
            </button>
        </div>
    </form>

       )
    };

    return (
        <Base title ="Update category here" 
        description= " Update category for existing tshirts"
        className="container bg-info p-4">
           <div className="row bg-white rounded">
               <div className="col-md-8 offset-md-2">
                   {successMessage()}
                   {errorMessage()}
                   {myCategoryForm()}
                   {goback()}
               </div>
           </div>
        </Base>
    );
};

export default UpdateCategory;
