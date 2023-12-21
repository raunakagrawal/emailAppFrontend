import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private allMembersUrl: string;
  private membersBygroupIdUrl: string;
  private saveMatchUrl: string;
  private getGroupUrl: string;
  private getGroupByUserUrl: string;
  private deleteGroupUrl: string;

  constructor(private http: HttpClient) {
    this.allMembersUrl ="http://localhost:8080/members/all";
    this.membersBygroupIdUrl ="http://localhost:8080/members/groupmember/";
    this.saveMatchUrl = "http://localhost:8080/members/savematch";
    this.getGroupUrl = "http://localhost:8080/groups/byId";
    this.getGroupByUserUrl ="http://localhost:8080/groups/byUserId"
    this.deleteGroupUrl = "http://localhost:8080/groups/"
   }

getMembers(id: string){
  return this.http.post<any>(this.allMembersUrl,id)
}
getMembersByGroupId(id: number){
  return this.http.get<any>(this.membersBygroupIdUrl+id)
}
saveMatch(matches: any){
  return this.http.put<any>(this.saveMatchUrl, matches) 
}
getGroup(id: string){
  return this.http.post<any>(this.getGroupUrl, id) 
}
getGroupByUser(id: number){
  return this.http.post<any>(this.getGroupByUserUrl, id) 
}
deleteGroup(id: number){
  return this.http.delete<any>(this.deleteGroupUrl+id) 
}
}
