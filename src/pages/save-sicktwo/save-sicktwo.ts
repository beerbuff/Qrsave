import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MenuteachertwoPage } from '../menuteachertwo/menuteachertwo';


/**
 * Generated class for the SaveSicktwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-sicktwo',
  templateUrl: 'save-sicktwo.html',
})
export class SaveSicktwoPage {
  student = '';
  term = '';
  teacher_id = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage: Storage) {
    this.savesick()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveSicktwoPage');
  }
  
  savesick() {
      this.storage.get('teacher_id').then((val) => {
      console.log("teacher_id is", val);
      let url = "http://192.168.1.72/servicephp/testsick2.php";
      this.http.get(url).subscribe((data: any) => {
        this.term = data.term;
        this.student = data.student;
        console.log(data);
      });
    })

  }

  postJson(student_id, sick_date, term_id, sick_description) {
      this.storage.get('teacher_id').then((val) => {
      console.log("teacher_id is", val);
      let jsonData = { student_id: student_id, sick_date: sick_date, term_id: term_id, sick_description: sick_description, teacher_id: val }; //สร้าง obj
      console.log(jsonData);
      let url = 'http://192.168.1.72/servicephp/serviceyodnam.php'; //ให้ไป post ที่  url
      this.http.post(url, jsonData).subscribe((data: any) => {
        // console.log(jsonData);
        alert("บันทึกเรียบร้อยแล้ว");
        this.navCtrl.push(MenuteachertwoPage)
        console.log(data);

      });

      //method post รับค่ามา 2 ค่า คือ url เว็บที่ต้องการโพสไป , obj 
      //subscribe ใส่  arrow  function ใส่ค่าเป็น data : any ข้อมูลอะไรก็ได้
    })

  }
  
}//end class
