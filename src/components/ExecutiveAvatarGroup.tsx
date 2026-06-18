'use client';

import {
  AvatarGroup,
  AvatarGroupTooltip,
} from './animate-ui/components/animate/avatar-group';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { executivesData } from '../data';
import { Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react';

export const ExecutiveAvatarGroup = () => {
    return (
        <AvatarGroup className="h-28 md:h-32 -space-x-5 md:-space-x-7 justify-center" translate="-35%">
            {executivesData.map((exec, index) => (
                <Avatar key={index} className="size-24 md:size-28 border-4 border-white dark:border-slate-800 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 relative">
                    <AvatarImage src={exec.avatar} alt={exec.name} className="object-cover" referrerPolicy="no-referrer" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                        {exec.name.split(' ').map(n=>n[0]).join('')}
                    </AvatarFallback>
                    <AvatarGroupTooltip className="bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl p-0 overflow-hidden">
                        <div className="p-4 w-56 text-center flex flex-col gap-2">
                          <p className="font-extrabold text-white text-base tracking-tight">{exec.name}</p>
                          <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{exec.title}</p>
                          <p className="text-slate-400 text-xs italic px-1 line-clamp-2">"{exec.vision}"</p>
                          <div className="flex gap-4 justify-center text-slate-300 mt-2 pt-2 border-t border-slate-800/80">
                              <a href={exec.socials[0]} className="hover:text-blue-400 transition-all hover:scale-125 duration-200"><Linkedin size={16} /></a>
                              <a href={exec.socials[1]} className="hover:text-sky-400 transition-all hover:scale-125 duration-200"><Twitter size={16} /></a>
                              <a href={exec.socials[2]} className="hover:text-pink-400 transition-all hover:scale-125 duration-200"><Instagram size={16} /></a>
                              <a href={exec.socials[3]} className="hover:text-green-400 transition-all hover:scale-125 duration-200"><MessageCircle size={16} /></a>
                          </div>
                      </div>
                    </AvatarGroupTooltip>
                </Avatar>
            ))}
        </AvatarGroup>
    );
};

