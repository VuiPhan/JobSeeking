import React from 'react'
 
import Menubar from "react-responsive-multi-level-menu";
function MutipleLevel() {
    const animation=['slideIn' , 'slideOut'];
    const menuItems = [
        { value: "Việc làm IT theo kỹ năng", 
          items: [
                  { value: "Men",
                    items: [{ value: "Shirts" }] 
                  }
                 ] 
        },
        { value: "Việc làm IT theo chức vụ", items: [] }
      ];
    return (
        <div>
    <Menubar data={menuItems} animation={animation} backgroundColor="#FF5733" className="menubar"/>
        </div>
    )
}

export default MutipleLevel
