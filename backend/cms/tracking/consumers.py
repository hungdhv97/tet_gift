import json
import logging
import time

from channels.generic.websocket import AsyncWebsocketConsumer

logger = logging.getLogger("django")


class VesselTrackingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "vessel_tracking"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        await self.channel_layer.group_send(
            self.room_group_name, {"type": "send_update", "message": message}
        )

    async def send_update(self, event):
        message = event["message"]
        start_time = time.time()
        await self.send(text_data=json.dumps({"message": message}))
        end_time = time.time()
        print(f"Time taken to send message: {end_time - start_time:.6f} seconds")
