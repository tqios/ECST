import {CgProfile} from "react-icons/cg";
import React from "react";
import {useState} from "react";


function Profile({name, email}) {

    return (
        <div>
            {/*<div className="mr-0">*/}
            {/*    <CgProfile className="text-3xl"/>*/}
            {/*</div>*/}

            <div>
                {name}
            </div>
            <div>
                {email}
            </div>
        </div>
    );
}

export default Profile;