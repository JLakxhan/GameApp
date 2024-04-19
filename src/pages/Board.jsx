import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import backgroundGif from "../assets/1.jpeg";

function Board() {
  const { level } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("chat-app-user");
    const user = userData ? JSON.parse(userData) : null;
    if (user) {
      setLoggedInUserId(user._id); // assuming _id is the identifier
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/");
  };

  // setLevel(prevLevel => prevLevel === 'hard' ? 'easy' : (prevLevel === 'easy' ? 'medium' : 'hard'));

  const changeEasy = () => {
    navigate("/board/easy"); // Pass level and time through state
  };
  const changeMedium = () => {
    navigate("/board/medium"); // Pass level and time through state
  };
  const changeHard = () => {
    navigate("/board/hard"); // Pass level and time through state
  };

  const columns = [
    
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Score",
      selector: (row) => row.score,
      sortable: true,
    },
    {
      name: "Rank",
      selector: (row) => row.rank,
      sortable: true,
    },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${level}`)
      .then((response) => {
        const processedUsers = response.data.map((user) => ({
          ...user,
          avatarImage: user.avatarImage
            ? `data:image/svg+xml;utf8,${encodeURIComponent(user.avatarImage)}`
            : null,
          score: user.scores[level],
        }));

        // Process avatarImage to URL
        setUsers(
          processedUsers.map((user) => {
            if (user.avatarImage) {
              const blob = new Blob(
                [
                  user.avatarImage.replace(
                    /^data:image\/(png|jpg|jpeg|gif);base64,/,
                    ""
                  ),
                ],
                { type: user.avatarImage.split(";")[0].split(":")[1] }
              );
              user.avatarImage = URL.createObjectURL(blob);
            }
            return user;
          })
        );
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [level]);

  function handleFilter(event) {
    const filter = event.target.value.toLowerCase();
    axios
      .get(`http://localhost:5000/getUsers/${level}`)
      .then((response) => {
        const filteredUsers = response.data
          .map((user) => ({
            ...user,
            avatarImage: user.avatarImage
              ? `data:image/svg+xml;utf8,${encodeURIComponent(
                  user.avatarImage
                )}`
              : null,
            score: user.scores[level],
          }))
          .filter((user) => user.username.toLowerCase().includes(filter));
        setUsers(filteredUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }

  const customStyles = {
    rows: {
      style: {
        backgroundColor: '#252630',
        color: "white"// Your default row background color
      },
    },
    headCells: {
      style: {
        backgroundColor: '#0e1015',
        fontSize: '16px',
        fontWeight: '500',
        color: 'white',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
      },
    },
    pagination: {
        style: {
          backgroundColor: '#0e1015', // Your desired pagination background color
          color: 'white',
        },
        pageButtonsStyle: {
          backgroundColor: '#38154b', // Color for the pagination buttons
          color: 'white',
          minHeight: '30px', // Adjust the size as needed
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: '#5d1654', // Color for the pagination buttons on hover
          },
        },
      },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row._id === loggedInUserId, // Assuming 'user123' is the logged-in user ID
      style: {
        backgroundColor: "#38154b", // New color for logged-in user's row
        color: "white",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#252630",
          color: "white", // Make sure to keep the hover color the same or change it if needed
        },
      },
    },
  ];
  

  return (
    <Container>
      <ButtonsContainer>
        <LevelButtons>
          <ButtonEasy onClick={changeEasy} style={{marginLeft:"20px",paddingLeft:"30px",paddingRight:"30px"}}>Easy</ButtonEasy>
          <ButtonEasy onClick={changeMedium} style={{marginLeft:"20px",paddingLeft:"30px",paddingRight:"30px"}}>Medium</ButtonEasy>
          <ButtonEasy onClick={changeHard} style={{marginLeft:"20px",paddingLeft:"30px",paddingRight:"30px"}}>Hard</ButtonEasy>
        </LevelButtons>
        
      </ButtonsContainer>
      <Button className='btn-danger'  onClick={logOut} style={{position:"absolute",top:25,right:25}}>LogOut</Button>
      <div className="container mt-5">
        <h1 className="score-head">Score board: {level}</h1>
        <div className="text-end">
          <input
            type="text"
            onChange={handleFilter}
            placeholder="Filter by name..."
          />
        </div>
        
        <StyledDataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${backgroundGif});
  .score-head {
    justify-content: center;
    align-items: center;
    color: black;
  }
`;
const ButtonsContainer = styled.div`
  width: 100%;
  position: relative; // Relative positioning for absolute child
  display: flex;
  justify-content: center; // Center the children horizontally
  align-items: center;
  padding-top: 3rem; // Or any desired value
`;

const LevelButtons = styled.div`
  
`;

const LogoutButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem; // Or any desired value
  margin-right: 1rem; // Or any desired value
`;

const StyledDataTable = styled(DataTable)`
  .rdt_Table {
    border-radius: 20px; // Replace with your desired border radius
    overflow: hidden; // This will apply the border radius properly by clipping the child elements

    // If the table has a border, you may also want to apply the same radius there
    .rdt_TableHead, .rdt_TableBody {
      border-radius: 20px;
    }
  }
`;

const ButtonEasy = styled(Button)`
    background-color: #38154b;

    &:hover {
      background-color: #5d1654;
    }
`
export default Board;
