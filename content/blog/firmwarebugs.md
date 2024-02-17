+++
title = "Firmware and bugs"
date = 2024-02-17
+++

If you've worked with code at all or just used a computer you are undoubtly aware of bugs, glitches and other oddities in programs.

Some of you may even think that programs such as firmware have to be perfect in the sense they have to have absolutley no bugs for the hardware they are providing firmware for to work but that is far from the truth and firmware can still be riddled with bugs just like any other code.

So lets start with some basic terminology and what they actually mean just to make sure everyone understands.

- Firmware 
Firmware is a program providing with a piece of hardware that provides initlisation and some very basic functionality to get your own code running on the hardware platform along with giving some interface between software and hardware, think of BIOS or UEFI on X86.

- Software
Just some code running on a PC.

- A bootloader
A program designed to start other programs.

- Hardware 
The physical device that we can touch and interact with.

So I wanted to talk about this today as I found a funny bug in my PCs firmware and this is a bug I did know about but I have only seen it in really old PCs and didn't think it was still in firmware as modern as mine. So today when I was working on my bootloader I figured I'd give it a go on my actual desktop PC. So I put it on a USB stick plug it in turn on my PC and huh nothing just a black screen with a blinking cursor.

Well this isn't good as I think so I grab a Laptop of mine that has a known good BIOS and I give it a go on that and it works first try. Which left me with the fun task of debugging my desktops faulty BIOS implementation. Now depending on your PC this isn't always going to be a pain to do as a lot of older PCs comes with Serial COM ports that can be used to create virtual terminal to dump debug information to. Sadly my desktop is a "Gamer" motherboard so no COM ports in site and nothing in the manual about debugging.

So I think to do the class the coder inserting "random" print statements to see where my code gets to. I notice the first print statement isn't triggered but the second one is. Thanks to knowing of this bug before hand I knew exactly what was happening straight away my PCs BIOS was skipping the code in the BPB area of the MBR having overwritten it with none sense data. Meaning I need to pad my code to skip that area of code so that it can work on my BIOS I do so and it boots to life straight away.

So why does this happen? Well to put it simply whoever made my computer's BIOs was trying to be "helpful". By writing the BIOS's CHS disk emulation data into the BPB of my MBR. However it's a complicated topic and not all BIOs do this which means as useful as it is or may be to me, I can't use it as it would break compatibility with other BIOs. So instead I have to work around this behaviour to get my code to work on this machine. Now there are other firmware bugs to of completely different types to.

So what is a firmware bug? Well it's simply when your PC/hardware manufacturer made a weird decision that is non standard or a mistake when making the firmware for your hardware causing your firmware to respond in unpredictable ways in comparison to others that follows standards more closely. Which is why as Os-devs and bootloader devs we have to be incredibly careful to work around these issues as and when they appear.

How to do this? While first step make **no assumptions!** This goes for all code really assumptions are your number one and number two enemy, as devs we may chose to run a piece of code like `malloc()` and just assume it's worked because 99.999% of the time it does just work, but it isn't a guaranteed success. Same things ring true for bootloaders and lower level code for Legacy systems the boot process starts at memory address `0x7c00` in linear memory address but there is not guarantee on what the state of registers look like in the CPU what the state of the `segement:offset` is or the stack. So it's simply best to assume when interacting with firmware you do not have the source code for that you need to work around it wherever that may come up. 

So the lesson don't be lazy when coding just cause you think your hardware "should be fine" and when calling any code that you don't 100% know how it works internally always try to work around potential bugs in user space this may mean not passing a NULL ptr or invalid argument in. With firmware this would mean assuming the firmware didn't do something for you rather than assuming it did.
