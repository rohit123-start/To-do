import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

//to post the data to the users table

export async function postUsers(json){
  console.log("1")
  const {email,user_name,password} = json
  console.log(email)
  const rows = await pool.query(`
  insert into users (user_name,email,password)
  values 
  (?,?,?)
  `,[user_name,email,password])
  console.log("3")
  return rows
}

//to post the data to the categories table

export async function postCategories(json){
  const {user_id,category_name} = json
  const rows = await pool.query(`
  insert into categories (user_id,category_name)
  values 
  (?,?)
  `,[user_id,category_name])
  return rows
}

// to post the task in tasks table

export async function postTasks(json){
  const {task,user_id,category_id} = json
  const rows = await pool.query(`
  insert into tasks (task,user_id,category_id)
  values
  (?,?,?);
  `,[task,user_id,category_id])
  return rows
}

// to get a specific data to the users table

export async function getUsers(id){
  console.log(id)
  const rows = pool.query(`
  select * 
  from users
  where id = ?
  ;`,[id])
  return rows
}

// To get categories of the specific user
export async function getCategories(user_id){
  console.log(user_id)
  const rows = pool.query(`
  select * 
  from categories
  where user_id = ?
  ;`,[user_id])
  console.log(rows)
  return rows
}

// To get tasks of the specific category
export async function getTasks(user_id,category_id){
  const rows = pool.query(`
  select * from tasks
  where user_id = ?
  and category_id = ?
  `,[user_id,category_id])
  return rows
}

//To get entire data in to-do-list database 
export async function getAlldata(params){
  console.log("1")
  if(params){
    console.log("hello")
    const rows = pool.query(`
    select users.id,users.user_name,users.email,users.password,
    categories.id category_id,categories.category_name,
    tasks.id task_id,tasks.task 
    from users 
    left join categories 
    on users.id = categories.user_id
    left join tasks 
    on categories.id = tasks.category_id
    where users.id = ?
    OR users.user_name = ?
    OR users.email = ?
    OR categories.category_name = ?
  `,[params,params,params,params])
    return rows
  }
  else{
    const rows = pool.query(`
    select users.id,users.user_name,users.email,users.password,
    categories.id category_id,categories.category_name,
    tasks.id task_id,tasks.task 
    from users 
    left join categories 
    on users.id = categories.user_id
    left join tasks 
    on categories.id = tasks.category_id
  `)
    return rows
  }
  
}


