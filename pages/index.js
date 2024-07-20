// pages/index.js
import { useState, useEffect } from "react";
import Web3 from "web3";
import FashionVoting from "../build/contracts/FashionVoting.json";

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [fashionLooks, setFashionLooks] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FashionVoting.networks[networkId];
        const contract = new web3.eth.Contract(
          FashionVoting.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3);
        setAccounts(accounts);
        setContract(contract);
      }
    };
    initWeb3();
  }, []);

  const loadFashionLooks = async () => {
    const count = await contract.methods.fashionLookCount().call();
    const looks = [];
    for (let i = 1; i <= count; i++) {
      const look = await contract.methods.fashionLooks(i).call();
      looks.push(look);
    }
    setFashionLooks(looks);
  };

  const addFashionLook = async () => {
    await contract.methods.addFashionLook(imageUrl).send({ from: accounts[0] });
    loadFashionLooks();
  };

  const voteFashionLook = async (id) => {
    await contract.methods.voteFashionLook(id).send({ from: accounts[0] });
    loadFashionLooks();
  };

  useEffect(() => {
    if (contract) {
      loadFashionLooks();
    }
  }, [contract]);

  return (
    <div>
      <h1>Fashion Match</h1>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <button onClick={addFashionLook}>Submit Fashion Look</button>
      <div>
        {fashionLooks.map((look, index) => (
          <div key={index}>
            <img
              src={look.imageUrl}
              alt={`Fashion Look ${index}`}
              width="100"
            />
            <p>Votes: {look.voteCount}</p>
            <button onClick={() => voteFashionLook(index + 1)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
