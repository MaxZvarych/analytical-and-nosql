import { OutputDataStrategy, ShelterAnimalContent } from "./OutputDataStrategy";
import axios from "axios"
import ConsoleStrategy from "./ConsoleStrategy";
import EventHubStrategy from "./EventHubStrategy";
var redis = require("redis");
import 'dotenv/config'
import ToVolumeFileStrategy from "./ToVolumeFileStrategy";

const requestDataUrl= 'https://www.dallasopendata.com/resource/7h2m-3um5.json'
let cacheHostName = process.env.REDISCACHEHOSTNAME;
    let cachePassword = process.env.REDISCACHEKEY;
    var cacheConnection = redis.createClient({
        // rediss for TLS
        url: cacheHostName ,
        password: cachePassword,
    });

async function sendDataToRedis() {

    // Connect to the Azure Cache for Redis over the TLS port using the key.
    
    
    console.log("\nCache command: PING");
    console.log("Cache response : " + await cacheConnection.ping());

    console.log("\nCache command: GET Status");
    const status= await cacheConnection.get(requestDataUrl)
    console.log("Cache response : " ,status );
    if (status==="completed"){
      console.log("\nCache command: SET second file upload");
      const load_number= await cacheConnection.get("loadNumber");
      console.log("Cache response : " + await cacheConnection.set("loadNumber",load_number?Number(load_number)+1:1));
      return false
    }
    console.log("\nCache command: SET status loading data");
    console.log("Cache response : " + await cacheConnection.set(requestDataUrl,"start loading data"
        ));

    // Demonstrate "SET Message" executed as expected...
    console.log("\nCache command: GET status for uploading data");
    console.log("Cache response : " + await cacheConnection.get(requestDataUrl));

    // Get the client list, useful to see if connection list is growing...
    // console.log("\nCache command: CLIENT LIST");
    // console.log("Cache response : " + await cacheConnection.sendCommand(["CLIENT", "LIST"]));

    console.log("\nDone");
    return true
}

interface StrategyRunner {
    getData: ()=> Promise<void>;
    data: ShelterAnimalContent[];
    outputter:OutputDataStrategy;
}

export default class OutputStrategyRunner implements StrategyRunner{
    data: ShelterAnimalContent[];    
    outputter:OutputDataStrategy;
    constructor() {
        this.data = [];
        this.outputter=process.env.STRATEGY_TYPE==="console"?new ConsoleStrategy(this.data):new EventHubStrategy(this.data)
    }
    public async getData( ):Promise<void> {
      let shouldUploadData=false
      await cacheConnection.connect();
         try {
            shouldUploadData = await sendDataToRedis();
            console.log(shouldUploadData)
            const { data } = await axios.get(requestDataUrl)
            this.data= data.slice(0,10);
            
            if(shouldUploadData) {
              this.outputter=process.env.STRATEGY_TYPE==="console"?new ConsoleStrategy(data.slice(0,5)):process.env.STRATEGY_TYPE==="file"?new ToVolumeFileStrategy(data.slice(0,81)):new EventHubStrategy(data.slice(0,81))
              console.log("\nCache command: SET status completed");
              console.log("Cache response : " + await cacheConnection.set(requestDataUrl,"completed"));
            }
            else{
              console.log("THIS DATA IS ALREADY PUT TO EVENTHUB, writing result to console")
              this.outputter= new ConsoleStrategy(data.slice(0,5))
            }
            
          } catch (error) {
            console.log('Error fetching animals or writing to redis ', error)
          }
          
    }

    public async outputSpecificStrategy( ):Promise<void> {
        this.outputter.output();
   }
}

const strategyRunner = new OutputStrategyRunner();
strategyRunner.getData().then(()=>strategyRunner.outputSpecificStrategy());
// strategyRunner.getData()

