// use std::collections::HashMap;

// fn add_one(x: &mut i32) {
//     *x += 1;
// }

fn main() {
    let mut value: i32 = 5;
    
    // #[repr(packed)]
    // struct Foo {
    //     x: i32,
    //     y: i32,
    // }
    // let mut foo = Foo { x: 1, y: 2 };
    let mut a = 8;
    let b = &mut a;
    add_one(b);
    // *b = 9;
    // a = 10;

    // println!("b: {}", b); println!("a: {}", a);
    print!("{}",b);
    dbg!();
    // println!("New value: {}", value);
    
    {
        let value_ref2 = &mut value;
        *value_ref2 = 88;
        // let value_ref1 = &value;
        println!("Reference 1: {:?}", value_ref2);
    }
    println!("xyz {}",value);
    // let mut buffer = String::new();
    // std::io::stdin().read_line(&mut buffer).expect("Failed to read line");
}


fn add_one(x: &mut i32) {
    *x += 1;
}

// fn main() {
//     let mut value = 5;

//     // let value_ref1 = &value;
//     // println!("Original value: {}", value);
//     // println!("Reference 1: {}", value_ref1);

//     let value_ref2 = &mut value;
//     *value_ref2 += 1;

//     println!("New value: {}", value);
//     println!("Reference 1: {}", value_ref2);
// }
