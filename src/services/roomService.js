import axios from "./axios";

class RoomService {
  async createRoom() {
    const {
      data: { roomId },
    } = await axios.post("rooms", null);

    return roomId;
  }

  async getRoom(roomId) {
    const { data: room } = await axios.post(`rooms/${roomId}`);

    return room;
  }

  async updateRoom({ roomId, roundCount, roundTime }) {
    return await axios.post(`rooms/${roomId}/update`, {
      roundCount,
      roundTime,
    });
  }
}

const roomService = new RoomService();

export { roomService };
