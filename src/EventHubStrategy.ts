import { OutputDataStrategy, ShelterAnimalContent } from "./OutputDataStrategy";
const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString="Endpoint=sb://animal-project.servicebus.windows.net/;SharedAccessKeyName=script-access-policy;SharedAccessKey=jhx2zhMDYhqrBctnp/IpwvRMsYvJgN796NdEwAhVPLY=;EntityPath=animals-project"
const eventHubName="animals-project"

export default class EventHubStrategy implements OutputDataStrategy {

    data: ShelterAnimalContent[];
    private producerClient: typeof EventHubProducerClient
    
    constructor(data: ShelterAnimalContent[]) {
        this.producerClient= new EventHubProducerClient(connectionString, eventHubName)
         this.data = data;
    }
    public async output( ):Promise<void> {
         try {
            await this.produce();
          } catch (error) {
            console.log('Error sending messages ', error)
          }
    }

     public async produce() { 
        for (let index = 0; index < Math.ceil(this.data.length/20)-1; index++) {
        let i = 0 
        const eventDataBatch = await this.producerClient.createBatch();
    
        // after the produce has connected, we start an interval timer
        try {
        while (i<20) {
            let wasAdded = eventDataBatch.tryAdd({ body: this.data[20*index+i] });                 
            if (!wasAdded) {
              break;
            }
            console.log("writes: ", this.data[i])
            i++;
          }
          await this.producerClient.sendBatch(eventDataBatch);
          
      
            } catch (err) {
                console.error("could not write message " + err)
            }
          
        }
        await this.producerClient.close();
        
    }


  
}
 