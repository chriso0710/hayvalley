---
title: Automate Chromium in kiosk mode on a flock of Raspberry Pis
---

[Carl Group](http://www.carl-group.de/en/home/) manages all technical aspects of large events and conferences, which involves operating multiple connected Raspberry Pis on different screens, distributed over the entire conference area.
At Carl Group we are using a small flock of Raspberry Pis for conference-branded screens, like schedule, voting results or social media walls with [SENDONSCREEN](http://send.on-screen.info). The Pis display dynamic web pages in full screen FullHD kiosk mode. They operate fully standalone and have no keyboard or mouse attached.

![Picture](/assets/images/pis.jpg)

We started with Pi 2s with Raspbian and the Midori and Iceweasel browsers. Those browsers were outdated, slow and buggy. We had to deal with sluggish screen refreshes and slow Javascript execution.

Recently we switched to the new Pi 3 and made some tests with the new [Raspbian Jessie Pixel desktop](https://www.raspberrypi.org/downloads/raspbian/), which has the current Chromium browser built in. This means no more cumbersome manual installation of Chromium.
Chromium on the Pi 3 works great. The new Pixel desktop with lightdm is really fast, responsive, lightweight and good looking. Great work by the Raspbian team!

## Ansible automation

Manually configuring the Pis is boring and error prone. And automation is one of my essential paradigms. I love [Ansible](https://www.ansible.com/), so the goal was to use Ansible to automate the installation and distribution of the Pi flock in kiosk mode. It had to be easy to update the Pis and to change the URL, which will be shown in Chromium. The base image had to be the new Jessie Pixel desktop on a 8 GB SD card. All configuration settings had to be made with Ansible, based on the standard image.

I use [Etcher](https://etcher.io/) for batch transferring the Jessie image to multiple SD cards. After burning Etcher asks you if you would like to burn the same image again. Just attach a new SD card and have all cards for your Pi flock ready in a few minutes. Jessie expands the SD volume automatically on first startup, which allows you to pass this step (which you could of course automate too).

I automated the following steps with Ansible:

1. Bootstrap and secure the Pi, create a management user for Ansible
2. Update the Debian image with apt
3. Configure the X environment for autostart kiosk mode
4. Set the URL for Chromium
5. Get some info about your machines

Ansible uses a management user for ssh access and the standard user "pi" for autologin and kiosk mode.

You can find my Ansible playbooks and detailed instructions for running them on [Github](https://github.com/chriso0710/pikiosk){: .btn .btn--success}

## The core

At the heart of the playbooks we set the autostart with the chrome url and restart the lightdm service.

```yaml
    tasks:

    - name: Create LXDE autostart configuration
      template:
        src: "templates/autostart.j2"
        dest: "/home/{{ autostart_user }}/.config/lxsession/LXDE-pi/autostart"
      notify: Restart lightdm

    handlers:

    # sudo systemctl restart lightdm.service
    - name: Restart lightdm
      service:
        name: lightdm
        state: restarted
```

## Where are my Pis?

Ansible needs the IP addresses of the hosts. Most networks we include the Pis in are using DHCP for address assignment. So how do you find your Pis after connecting them to a network? A simple nmap scan of port 22 on the Ansible management machine (which of course needs to be in the same network) helps:

```
$ sudo nmap -p 22 --open -sV 192.168.100.0/24

Nmap scan report for 192.168.100.32
Host is up (0.00034s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.7p1 Raspbian 5+deb8u3 (protocol 2.0)
MAC Address: B8:27:EB:0E:47:7A (Raspberry Pi Foundation)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap scan report for 192.168.100.57
Host is up (0.00056s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.7p1 Raspbian 5+deb8u2 (protocol 2.0)
MAC Address: B8:27:EB:26:A0:53 (Raspberry Pi Foundation)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap scan report for 192.168.100.63
Host is up (0.00068s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.7p1 Raspbian 5+deb8u2 (protocol 2.0)
MAC Address: B8:27:EB:01:78:C4 (Raspberry Pi Foundation)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

...

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 256 IP addresses (14 hosts up) scanned in 6.55 seconds
```

The MAC address is good to know, too. We use the MAC address for identifying our Pis. They have the last 3 bytes of the MAC address labeled on them.
The organization identifier of the Raspberry Pi foundation is B8:27:EB, which are the first 3 bytes.

## Update January 2017 - Eddystone beacons

The Pi 3 has Bluetooth builtin, which qualifies it as a BT beacon. These Pis can operate with Google's Eddystone protocol and advertise Eddystone URLs. This can be very useful for advertising voting pages and inviting a guest/participant to vote.

The repository includes a playbook for setting up a Eddystone beacon with a single Ansible command. It uses [PyBeacon](https://github.com/nirmankarta/PyBeacon).

## Resources

* [5Minutes - Server Security Essentials](https://github.com/chhantyal/5minutes)
* [Boostrapping and securing an Ubuntu server](https://github.com/zenzire/ansible-bootstrap-ubuntu)
* [Ansible Bootstrap Playbook](http://www.rubytreesoftware.com/resources/ansible-bootstrap-playbook/)
* [Bootstrapping Servers into Ansible](http://blog.scottlowe.org/2015/05/26/bootstrap-servers-ansible/)
* [Ansible SSH Setup Playbook](http://www.hashbangcode.com/blog/ansible-ssh-setup-playbook)
* [My first 2 minutes on a server](https://xdeb.org/node/1615)
* [Running wallscreens using a Raspberry Pi](https://www.redpill-linpro.com/sysadvent/2016/12/24/wallscreen-on-a-raspberry-pi.html)
