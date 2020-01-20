import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MenuteacherPage } from '../menuteacher/menuteacher';

/**
 * Generated class for the CheckstudyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkstudy',
  templateUrl: 'checkstudy.html',
})
export class CheckstudyPage {
  student = [];
  term = '';
  teacher = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage: Storage) {
    this.loadstudentcheckData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckstudyPage');
  }

  loadstudentcheckData() {
    let url = "http://192.168.1.72/servicephp/testsick.php";
    this.http.get(url).subscribe((data: any) => {
      this.student = data.student;
      this.term = data.term;

    }, (error) => { console.log(error) });

  }

  postJson(ac_date, student_id, term_id) {
    this.storage.get('teacher_id').then((val) => {
      console.log("teacher_id is", val);
      let jsonData = { ac_date: ac_date, student_id: student_id, teacher_id: val, term_id: term_id }; //สร้าง obj
      console.log(jsonData);
      let url = 'http://192.168.1.72/servicephp/serviceattend.php'; //ให้ไป post ที่  url
      this.http.post(url, jsonData).subscribe((data: any) => {
        // console.log(jsonData);
        alert("บันทึกเรียบร้อยแล้ว");
        this.navCtrl.push(MenuteacherPage)
        console.log(data);

      });

      //method post รับค่ามา 2 ค่า คือ url เว็บที่ต้องการโพสไป , obj 
      //subscribe ใส่  arrow  function ใส่ค่าเป็น data : any ข้อมูลอะไรก็ได้
    })

  }


}// end class
