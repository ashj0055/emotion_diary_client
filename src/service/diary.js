export default class DiaryService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getDiary(id) {
    const params = id ? `/${id}` : "";
    const response = await fetch(`${this.baseURL}/diary${params}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  }

  async postDiary(date, content, emotion) {
    const response = await fetch(`${this.baseURL}/diary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date(date).getTime(),
        content,
        emotion,
      }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteDiary(diaryId) {
    const response = await fetch(`${this.baseURL}/diary/${diaryId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 204) {
      throw new Error();
    } else {
      return response.status;
    }
  }

  async updateDiary(diaryId, date, content, emotion) {
    const response = await fetch(`${this.baseURL}/diary/${diaryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, content, emotion }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
