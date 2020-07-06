import React, { Component } from "react";
import Grid from "./grid";
import end from "./finish.png";
import start from "./download.png";

const Modal = () => {
  return (
    <div
      style={{ position: "top", top: "200px", color: "white", left: "44vw" }}
      className="p-4 bg-dark rounded animation-target"
    >
      Sorry You Can't reach end point!
    </div>
  );
};
export class App extends Component {
  state = {
    height: 15,
    width: 30,
    start: [7, 5],
    end: [7, 25],
    path: [],
    current: null,
     grid: Array(20)
       .fill()
    .map(() => Array(40).fill(0)),
    visualize: false,
    method: 0,
    showModal: false,
    speed: 1,
  };
  

  visualizeDijkstra = async () => {
    //BFS being implemented as Dijkstra's Algorithm, becomes BFS in Unweighted Graphs
   let path = Array(20).fill().map(() => Array(40).fill([]));
   
    let q = [this.state.start];//queue to implement BFS
    let flag = 1;
    this.clearPath();
    this.setState({ visualize: true });//To disable buttons


    while (q.length !== 0 && flag) {
      //To slow down the speed of Animation
      // a promise is returned becoz in future the speed may change
      await new Promise((done) => setTimeout(() => done(), this.state.speed));
      let current = q[0];
      q.shift();
      this.setState({ current });

      let grid = this.state.grid;
      
      if (current[0] === this.state.end[0] &&current[1] === this.state.end[1]) {
        console.log(current);
        console.log(path);
        flag = 0;//when we reach end point set the flag to 0 and while loop terminates
      } else {
        let list = [];
        //now only 4 cases can arrive

        /*1st case:-if current(x) of 0 is not in last row and
        the next neighbour down is unvisited
        */
        if (current[0] !== this.state.height - 1 && grid[current[0] + 1][current[1]] === 0) {

          //down neigh is pushed into list
          list.push([current[0] + 1, current[1]]);
          //console.log(current);
          path[current[0] + 1][current[1]] = [...path[current[0]][current[1]],current];
          //console.log(path[current[0] + 1][current[1]]);
          path[current[0] + 1][current[1]].push(current);
        }

        /*2nd case:-if current(y) of 1 is not the last column and
        the next neighour right is unvisited */

        if (current[1] !== this.state.width - 1 &&grid[current[0]][current[1] + 1] === 0) {
          //right neigh is pushed into list
          list.push([current[0], current[1] + 1]);
          
          path[current[0]][current[1] + 1] = [...path[current[0]][current[1]],current,];
          //console.log( path[current[0]][current[1] + 1]);
        }

        /*3rd case:-if current(x) is not zero and up is not visited */
        if (current[0] !== 0 && grid[current[0] - 1][current[1]] === 0) {
          //up neigh is pushed into list
          list.push([current[0] - 1, current[1]]);
          
          path[current[0] - 1][current[1]] = [...path[current[0]][current[1]],current,];
          //console.log( path[current[0] - 1][current[1]])
        }

        /*4th case:= if current(y) is not zero and left is unvisited */
        if (current[1] !== 0 && grid[current[0]][current[1] - 1] === 0) {
          //left neigh is pushed into list
          list.push([current[0], current[1] - 1]);
          
          path[current[0]][current[1] - 1] = [...path[current[0]][current[1]],current,];
          //console.log(path[current[0]][current[1] - 1]);
          
        }

        //mark current node as visited
        grid[current[0]][current[1]] = 3;

        //changing the state of grid
        this.setState({ grid });
        //appending the list of neighbours to the queue
        q = q.concat(list);
      }
    }
    //To show the Modal when No Path is Found
    if (flag !== 0) {
      this.setState({ showModal: true, current: null });
      setTimeout(() => this.setState({ showModal: false }), 5000);
    } else {
     //To show the Path between start and the Target
      for (let i = 0;i < path[this.state.end[0]][this.state.end[1]].length;i++) {
        await new Promise((done) => setTimeout(() => done(), 0.1));//To slow down the animation
        this.setState(
          { path: path[this.state.end[0]][this.state.end[1]].slice(0, i + 1),}
        );
      }
      
    }

    this.setState({ visualize: false });//To enable buttons again
  };

  clearPath = () => {
    //To clear the path between start and target
    //clearing visited nodes
    this.setState((state) => {
      return {
        grid: state.grid.map((row) =>
          row.map((obj) => {
            if (obj === 1 || obj === 0) 
            return obj;
            else 
            return 0;
          })
        ),
        path: [],

        current: null,
      };
    });
  };


  toggleWall = (x, y, type) => {
    //Convert a unvisited node to a wall and vice versa
    if (type === 1) {
      this.setState((state) => {
        let grid = state.grid;
        grid[x][y] = 0;
        return { grid };
      });
    } else {
      this.setState((state) => {
        let grid = state.grid;
        grid[x][y] = 1;
        return { grid };
      });
    }
  };

  render() {
    return (
      <div>

        {this.state.showModal ? <Modal /> : null}

        <div

          className="navbar navbar-dark "
          style={{ backgroundColor: "#f3c623"}}
        >
          <div className="navbar-brand">
            PathFinder
          </div>
            <button
              className=" btn btn-primary ml-auto mr-2"
              onClick={() =>
                this.visualizeDijkstra()
              }
             disabled={this.state.visualize}
            >
              Visualize Dijkstra's Algorithm
            </button>

            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle mx-2"
                type="button"
                id="dropdownMenuButton"
               
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                disabled={this.state.visualize}//for disabling the button
              >
                {this.state.speed === 1
                  ? "Fast"
                  : this.state.speed === 200
                  ? "Average"
                  : "Slow"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ speed: 1 })}
                >
                  Fast
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ speed: 200 })}
                >
                  Average
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ speed: 500 })}
                >
                  Slow
                </button>
              </div>
            </div>


            <button
              className=" btn-primary btn mx-2"
              onClick={() =>
                this.setState({
                  grid: Array(20)
                    .fill()
                    .map(() => Array(40).fill(0)),//grid is filled with zeros
                  path: [],//the path array is emptied
                  current: null,//current array is made null
                })
              }
              disabled={this.state.visualize}//the state of button is disabled when program is runnin
            >
              Clear Walls
            </button>

            <button
              className="btn-primary btn mx-2"
              onClick={() => this.clearPath()}
              
              disabled={this.state.visualize}
            >
              Clear Path
            </button>
          </div>
        

        <div className="container-fluid">
          <div className="row pt-4">
            <div className="row mx-4">
              Start Point :-
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  WebkitUserSelect: "none",
                }}
              >
                <img
                  src={start}
                  alt="start"
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
            </div>
            <div className="row mx-4">
              End Point:-
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  WebkitUserSelect: "none",
                }}
              >
                <img
                  src={end}
                  alt="start"
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
            </div>
            <div className="row mx-4">
              Visited Node:-
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#a6b1e1",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
            <div className="row mx-4">
              Unvisited Node:-
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                  border: "4px solid lightblue",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
            <div className="row mx-4">
              Shortest Path Node:-
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#fcf876",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
            <div className="row mx-4">
              Wall Node:-
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#FF0000",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
            <div className="row mx-4">
              Current Node:-
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "pink",
                  WebkitUserSelect: "none",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>
        </div>
        <Grid
          height={this.state.height}
          grid={this.state.grid}
          path={this.state.path}
          current={this.state.current}
          start={this.state.start}
          end={this.state.end}
          width={this.state.width}
          visualize={this.state.visualize}
          toggleWall={this.toggleWall}
        />
      </div>
    );
  }
}

export default App;
