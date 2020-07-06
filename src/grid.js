import React from "react";
import start from "./download.png";
import "./grid.css";
import end from "./finish.png";

//function to check whether current value is in path arr or not
const isInPathArray = (arr, x, y) => {
  return arr.reduce((t, c) => {
    if (c[0] === x && c[1] === y) {
      return true;
    }
    return t;
  }, false);
};
/*
1.)first grid will render along with start and end pngs
2.)Now user will be able to place walls(1 will be marked in the grid)
3.)

*/
function Grid(props) {
  /*
  0 - Unvisited Node
  1 - Wall Node
  3 - Visited Node
  
  */
  const height = 15;
  const width =  30;
  let list = [];

  for (let i = 0; i < height; i++) {
    let temp = [];
    for (let j = 0; j < width; j++) {
      
        //If it is the starting node
      if (i === props.start[0] && j === props.start[1]) {
        
        if (props.path.length) {//initially path array is empty but if path.length >1 than push it in temp arr with color yellow
          temp.push(//when path array is filled by dijksta's algo mark it yellow to represent it as path
            <div
              key={i + j}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#fcf876",//yellow
                WebkitUserSelect: "none",
              }}
            >
              <img
                src={start}
                alt="start"
                style={{ width: "25px", height: "25px" }}
              />
            </div>
          );
        }
        //if it is visited node
        else if(props.grid[i][j]===3)
         { temp.push(
            <div
              key={i + j}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor:'#a6b1e1',//pf color marking it visited
                WebkitUserSelect: "none",
              }}
            >
              <img
                src={start}
                alt="start"
                style={{ width: "25px", height: "25px" }}
              />
            </div>
          );}
         else//initially it will happen and start png will be placed(1.0)
          temp.push(
            <div
              key={i + j}
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid lightblue",
                WebkitUserSelect: "none",
              }}
            >
              <img
                src={start}
                alt="start"
                style={{ width: "25px", height: "25px" }}
              />
            </div>
          );
      } //if it is start node ends here

      //if it is present in final path array
      else if (isInPathArray(props.path, i, j)) {
        temp.push(
          <div
            key={i + j}
            className="animation-target "
            style={{
              width: "30px",
              height: "30px",
              WebkitUserSelect: "none",
              backgroundColor: "#fcf876",//yellow
            }}
          ></div>
        );
      } 
      //if it is end node
      else if (i === props.end[0] && j === props.end[1]) {
        if (props.path.length) {
          temp.push(
            <div
              key={i + j}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#fcf876",//yellow
                WebkitUserSelect: "none",
              }}
            >
              <img
                src={end}
                alt="start"
                style={{ width: "25px", height: "25px" }}
              />
            </div>
          );
        } 
        else//initially end png will be placed(1.0)
          temp.push(
            <div
              key={i + j}
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid lightblue",//unvisited blue
                WebkitUserSelect: "none",
              }}
            >
              <img
                src={end}
                alt="start"
                style={{ width: "25px", height: "25px" }}
              />
            </div>
          );
      } 
      //if it is the current node
      else if (props.current && props.current[0] === i && props.current[1] === j) {
        temp.push(
          <div
            key={i + j}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "pink",//yellow current node is marked yellow
              WebkitUserSelect: "none",
              borderRadius: "50%",
            }}
          ></div>
        );
      } //if it is already visited
      else if (props.grid[i][j] === 3) {
        temp.push(
          <div
            key={i + j}
            className="animation-target"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#a6b1e1",//visited 
              WebkitUserSelect: "none",
            }}
          ></div>
        );
      } 
      //if it is wall this will be (2.0) 
      else if (props.grid[i][j] === 1) {
        temp.push(
          <div
            key={i + j}
            className="animation-target"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#FF0000",//red colour wall
              WebkitUserSelect: "none",
            }}
            //when user will touch a poriton of grid
            onTouchStart={(e) => {
              if (window.event.buttons === 1 && !props.visualize) {
                props.toggleWall(i, j, 1);
              }
            }}
            //this is without touching i.e. bringing on the grid only
            onMouseEnter={(e) => {
              //if user clicks the button
              if (window.event.buttons === 1 && !props.visualize) {
                props.toggleWall(i, j, 1);
              }
            }}
            //after clicking toggleWall function triggered
            onClick={(e) => {
              if (!props.visualize) 
              props.toggleWall(i, j, 1);
            }}
          ></div>
        );
      } //this will render along with navbar and the info bar but if i,j are coordinates of start and end point then above loops will function
        //initial(1.0)
      else {
        temp.push(
          <div
          
            key={i + j}
            style={{
              width: "30px",
              height: "30px",
              border: "4px solid lightblue",
              WebkitUserSelect: "none",
            }}
            onTouchStart={(e) => {
              if (window.event.buttons === 1 && !props.visualize) {
                props.toggleWall(i, j, 0);
              }
            }}
            onMouseEnter={(e) => {
              if (window.event.buttons === 1 && !props.visualize) {
                props.toggleWall(i, j, 0);
              }
            }}
            onClick={(e) => {
              if (!props.visualize) props.toggleWall(i, j, 0);
            }}
          ></div>
        );
      }

    }

    list.push(temp);
  }

  return (
    <div className="p-5">
    
      {list.map((obj, ind) => {
        
        return (
          <div className="row justify-content-center flex-nowrap" key={ind}>
          {obj}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
